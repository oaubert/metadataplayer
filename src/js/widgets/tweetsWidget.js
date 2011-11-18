/* a widget that displays tweet - used in conjunction with the polemicWidget */

IriSP.TweetsWidget = function(Popcorn, config, Serializer) {
  IriSP.Widget.call(this, Popcorn, config, Serializer);
 
  this._isDisplayingTweet = false;
  this._ignoreClear = false;
};


IriSP.TweetsWidget.prototype = new IriSP.Widget();


IriSP.TweetsWidget.prototype.drawTweet = function(annotation) {
    
    var title = annotation.content.title;
    var img = annotation.content.img.src;
    if (typeof(img) === "undefined" || img === "" || img === "None") {
      img = IriSP.widgetsDefaults.TweetsWidget.default_profile_picture;
    }
    
    var imageMarkup = Mustache.to_html("<img src='{{src}}' alt='avatar'></img>", 
                                       {src : img});

    this.selector.find(".Ldt-tweetContents").text(title);
    this.selector.find(".Ldt-tweetAvatar").html(imageMarkup);
    this.selector.show(50);
};

IriSP.TweetsWidget.prototype.displayTweet = function(annotation) {
  if (this._isDisplayingTweet === false) {
    this._isDisplayingTweet = true;
  } else { /* we're already displaying a tweet */
    this._ignoreClear = true;
  }
  
  this.drawTweet(annotation);

  var time = this._Popcorn.currentTime();  
  // this._Popcorn.exec(time + 10, IriSP.wrap(this, this.clearPanel)); 
  window.setTimeout(IriSP.wrap(this, this.clearPanel), 10000);
};


IriSP.TweetsWidget.prototype.clearPanel = function() {
  debugger;
  if (this._ignoreClear === true) {
    this._ignoreClear = false;
    return;
  } else {
    /* clear the display */
    this.closePanel();
    this._isDisplayingTweet = false;    
    this._ignoreClear = false;    
  }
};

IriSP.TweetsWidget.prototype.closePanel = function() {
  if (this._displayingTweet)
    return;
  else {
    this.selector.hide(50);
  }
};

IriSP.TweetsWidget.prototype.draw = function() {
  var _this = this;
  
  var tweetMarkup = Mustache.to_html(IriSP.tweetWidget_template, {"share_template" : IriSP.share_template});
	this.selector.append(tweetMarkup);
  this.selector.hide();
  
  this._Popcorn.listen("IriSP.PolemicTweet.click", IriSP.wrap(this, this.PolemicTweetClickHandler));
};

IriSP.TweetsWidget.prototype.PolemicTweetClickHandler = function(tweet_id) {  
  var index, annotation;
  for (index in this._serializer._data.annotations) {
    annotation = this._serializer._data.annotations[index];
    
    if (annotation.id === tweet_id)
      break;
  }
    
  if (annotation.id !== tweet_id)
      /* we haven't found it */
      return;
  
  this.displayTweet(annotation);
  return;
};