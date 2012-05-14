/* main file */
// Why is it called main ? It only loads the libs !

if ( window.IriSP === undefined && window.__IriSP === undefined ) { 
  /**
    @class
    the object under which everything goes.        
  */
	IriSP = {}; 
  
  /** Alias to IriSP for backward compatibility */
	__IriSP = IriSP;
}

/* underscore comes bundled with the player and we need 
   it ASAP, so load it that way
*/

IriSP._ = window._.noConflict();
IriSP.underscore = IriSP._;

IriSP.getLib = function(lib) {
    return (
        IriSP.libFiles.useCdn && typeof IriSP.libFiles.cdn[lib] == "string"
        ? IriSP.libFiles.cdn[lib]
        : (
            typeof IriSP.libFiles.locations[lib] == "string"
            ? IriSP.libFiles.locations[lib]
            : (
                typeof IriSP.libFiles.inDefaultDir[lib] == "string"
                ? IriSP.libFiles.defaultDir + IriSP.libFiles.inDefaultDir[lib]
                : null
            )
        )
    )
}

IriSP._cssCache = [];

IriSP.loadCss = function(_cssFile) {
    if (typeof _cssFile === "string" && _cssFile && IriSP._(IriSP._cssCache).indexOf(_cssFile) === -1) {
        IriSP.jQuery("<link>", {
            rel : "stylesheet",
            type : "text/css",
            href : _cssFile
        }).appendTo('head');
        IriSP._cssCache.push(_cssFile);
    }
}

IriSP.loadLibs = function( config, metadata_url, callback ) {
    var $L = $LAB.script(IriSP.getLib("jQuery")).script(IriSP.getLib("swfObject")).wait()
                .script(IriSP.getLib("jQueryUI"));
                                   
    if (config.player.type === "jwplayer" || config.player.type === "allocine") {
      // load our popcorn.js lookalike
      $L.script(IriSP.getLib("jwplayer"));
    } else {
      // load the real popcorn
      $L.script(IriSP.getLib("popcorn")).script(IriSP.getLib("popcorn.code"));
      if (config.player.type === "youtube") {
        $L.script(IriSP.getLib("popcorn.youtube"));
      } 
      if (config.player.type === "vimeo")
        $L.script(IriSP.getLib("popcorn.vimeo"));
      
      /* do nothing for html5 */
    }       
    
    /* widget specific requirements */
    for (var idx in config.gui.widgets) {
      if (config.gui.widgets[idx].type === "PolemicWidget" ||
          config.gui.widgets[idx].type === "StackGraphWidget" ||
          config.gui.widgets[idx].type === "SparklineWidget") {        
        $L.script(IriSP.getLib("raphael"));
      }
    }
    
    // same for modules
    /*
    for (var idx in config.modules) {
      if (config.modules[idx].type === "PolemicWidget")
        $L.script(IriSP.getLib("raphaelJs"));
    }
    */
    $L.wait(function() {
        if (typeof IriSP.jQuery === "undefined" && typeof window.jQuery !== "undefined") {
            IriSP.jQuery = window.jQuery.noConflict();
        }
        IriSP.loadCss(IriSP.getLib("cssjQueryUI"));
        IriSP.loadCss(config.gui.css);
          
      IriSP.setupDataLoader();
      IriSP.__dataloader.get(metadata_url, 
          function(data) {
            /* save the data so that we could re-use it to
               configure the video
            */
            IriSP.__jsonMetadata = data;
            callback.call(window) });
    });
};