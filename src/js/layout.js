/* layout.js - very basic layout management */

/*
  a layout manager manages a div and the layout of objects
  inside it.
*/

IriSP.LayoutManager = function(options) {
    this._Popcorn = null;
    this._widgets = [];
    
    this._div = "LdtPlayer";
    this._width = 640;
    
    if (options === undefined) {
      options = {};
    };
    
    if (options.hasOwnProperty('container')) {
      this._div = options.container;
    }

    if (options.hasOwnProperty('width')) {
      this._width = options.width;
    }    
    
    if (options.hasOwnProperty('height')) {
      this._height = options.height;
    } 
    
    /* this is a shortcut */
    this.selector = IriSP.jQuery("#" + this._div);
    
    this.selector.css("width", this._width);
    
    if (this._height !== undefined)
      this.selector.css("height", this._height);
};

/* we need this special setter because of a chicken and egg problem :
   we want the manager to use popcorn but the popcorn div will be managed
   by the manager. So we need a way to set the instance the manager uses
*/
   
IriSP.LayoutManager.prototype.setPopcornInstance = function(popcorn) {
    this._Popcorn = popcorn;
}

/* stem is a string to append to the id of the widget */
IriSP.LayoutManager.prototype.createDiv = function(stem) {
    if (typeof(stem) === "undefined")
       stem = "";

    var newDiv = Popcorn.guid(this._div + "_widget_" + stem + "_");
    var spacerDiv = Popcorn.guid("LdtPlayer_spacer_");
    this._widgets.push(newDiv);

    var divTempl = "<div id='{{id}}' style='width: 100%; position: relative;'></div";
    var spacerTempl = "<div id='{{spacer_id}}' style='width: 100%; position: relative; height: {{spacer_div_height}};'></div";
    
    var divCode = Mustache.to_html(divTempl, {id: newDiv});
    var spacerCode = Mustache.to_html(spacerTempl, {spacer_id: spacerDiv, spacer_div_height: IriSP.widgetsDefaults.LayoutManager.spacer_div_height });

    this.selector.append(spacerCode);
    this.selector.append(divCode);
    
    return [newDiv, spacerDiv];
};
