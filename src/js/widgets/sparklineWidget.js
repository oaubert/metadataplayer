/** @class The constructor for the sparkline widget */
IriSP.SparklineWidget = function(Popcorn, config, Serializer) {
  IriSP.Widget.call(this, Popcorn, config, Serializer);

  this._oldAnnotation = null;
  this._results = [];
};


IriSP.SparklineWidget.prototype = new IriSP.Widget();

IriSP.SparklineWidget.prototype.clear = function() {

};

/** draw the sparkline using jquery sparkline */
IriSP.SparklineWidget.prototype.draw = function() {
  var templ = Mustache.to_html(IriSP.SparklineWidget_template, {width: this.width, height: this.height});
  /** this widget uses three divs -
    the first is the sparkline, which is generated by jquery sparkline,
    the second is an overlay div to display the progression in the video,
    and the third is a div to react to clicks
  */
  
  var views = this._serializer._data.views;
  var stat_view;
  if (!IriSP.null_or_undefined(views)) {
    
    var i;
    for (i = 0; i < views.length; i++) {
      var view = views[i];
      if (view.id === "stat") {
          stat_view = view;
          break;
      }
    }
  }
  
  // If we've found the correct view, feed the directly the data from the view
  // to jquery sparkline. Otherwise, compute it ourselves.
  if (!IriSP.null_or_undefined(stat_view)) {
    console.log("sparklinewidget : using stats embedded in the json");
    var results = stat_view.meta.stat.split(",");      
  } else {
    console.log("sparklinewidget : computing stats ourselves");
    var num_columns = (this.selector.width()) / IriSP.widgetsDefaults["SparklineWidget"].column_width;
    var duration = +this._serializer.currentMedia().meta["dc:duration"];
    var time_step = duration / num_columns; /* the time interval between two columns */
    var results = [];
    var i = 0; /* the index in the loop */  

    /* this algorithm makes one assumption : that the array is sorted 
       (it's done for us by the JSONSerializer). We go through the array 
       and count how many comments fall within a peculiar time piece.
       As i is preserved between each iteration, it's O(n).
    */
    
    for(var j = 0; j < num_columns && i < this._serializer._data.annotations.length; j++) {    
      var count = 0;
      var annotation_begin = +(this._serializer._data.annotations[i].begin);
      
      while(annotation_begin >= j * time_step && annotation_begin <= (j + 1) * time_step ) {
        count++;
        i++;
        if (i >= this._serializer._data.annotations.length)
          break;
          
        annotation_begin = +(this._serializer._data.annotations[i].begin);
        
      }
      
      results.push(count);
    }
  }
  
  // save the results in an array so that we can re-use them when a new annotation
  // is added.
  this._results = results;
  
  this.selector.append(templ);
  this.selector.find(".Ldt-sparkLine").css("background", "#c7c8cc");
  this.selector.find(".Ldt-sparkLine").sparkline(results, {lineColor: "#7492b4", fillColor: "#aeaeb8",
                                                           spotColor: "#b70056",
                                                           width: this.width, height: this.height});
  this._Popcorn.listen("timeupdate", IriSP.wrap(this, this.timeUpdateHandler));
  this._Popcorn.listen("IriSP.createAnnotationWidget.addedAnnotation", IriSP.wrap(this, this.handleNewAnnotation));
  
  IriSP.jQuery(".Ldt-sparkLineClickOverlay").click(IriSP.wrap(this, this.clickHandler));  
};

/** react to a timeupdate event */
IriSP.SparklineWidget.prototype.timeUpdateHandler = function() {
  var currentTime = this._Popcorn.currentTime();  
  var duration = +this._serializer.currentMedia().meta["dc:duration"] / 1000;
  var proportion = ((currentTime / duration) * 100).toFixed(4);
  
  IriSP.jQuery(".Ldt-sparkLinePositionMarker").css("width", proportion + "%");                                    
}

/** handle clicks on the widget */
IriSP.SparklineWidget.prototype.clickHandler = function(event) {
  /* this piece of code is a little bit convoluted - here's how it works :
     we want to handle clicks on the progress bar and convert those to seeks in the media.
     However, jquery only gives us a global position, and we want a number of pixels relative
     to our container div, so we get the parent position, and compute an offset to this position,
     and finally compute the progress ratio in the media.
     Finally we multiply this ratio with the duration to get the correct time
  */

  var parentOffset = this.selector.offset();
  var width = this.selector.width();
  var relX = event.pageX - parentOffset.left;

  var duration = this._serializer.currentMedia().meta["dc:duration"] / 1000;
  var newTime = ((relX / width) * duration).toFixed(2);
    
  this._Popcorn.trigger("IriSP.SparklineWidget.clicked", newTime);
  this._Popcorn.currentTime(newTime);                                 
};

/** react when a new annotation is added */
IriSP.SparklineWidget.prototype.handleNewAnnotation = function(annotation) {
  var num_columns = this._results.length;
  var duration = +this._serializer.currentMedia().meta["dc:duration"];
  var time_step = Math.round(duration / num_columns); /* the time interval between two columns */
  var begin = +annotation.begin;
  var end = +annotation.end;
  
  /* increment all the values between the beginning and the end of the annotation */
  var index_begin = Math.floor(begin / time_step);
  var index_end = Math.floor(end / time_step);
  
  for (var i = index_begin; i < Math.min(index_end, this._results.length); i++) {
    this._results[i]++;
  }
  
  this.selector.find(".Ldt-sparkLine").sparkline(this._results, {lineColor: "#7492b4", fillColor: "#aeaeb8",
                                                           spotColor: "#b70056",
                                                           width: this.width, height: this.height});
};