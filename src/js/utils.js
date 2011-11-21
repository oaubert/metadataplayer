/* utils.js - various utils that don't belong anywhere else */

/* trace function, for debugging */

IriSP.traceNum = 0;
IriSP.trace = function( msg, value ) {
/*
	if( IriSP.config.gui.debug === true ) {
		IriSP.traceNum += 1;
		IriSP.jQuery( "<div>"+IriSP.traceNum+" - "+msg+" : "+value+"</div>" ).appendTo( "#Ldt-output" );
	}
*/
};

/* used in callbacks - because in callbacks we lose "this",
   we need to have a special function which wraps "this" in 
   a closure. This way, the 
*/   
IriSP.wrap = function (obj, fn) {
  return function() {    
    var args = Array.prototype.slice.call(arguments, 0);
    return fn.apply(obj, args);
  }
}

/* convert a time to a percentage in the media */
IriSP.timeToPourcent = function(time, timetotal){
	var time = Math.abs(time);
  var timetotal = Math.abs(timetotal);
  
	return Math.floor((time/timetotal) * 100);
};

IriSP.padWithZeros = function(num) {
  if (Math.abs(num) < 10) {
    return "0" + num.toString();
  } else {
    return num.toString();
  }
};
/* convert a number of seconds to a tuple of the form 
   [hours, minutes, seconds]
*/
IriSP.secondsToTime = function(secs) {  
  var hours = Math.abs(parseInt( secs / 3600 ) % 24);
  var minutes = Math.abs(parseInt( secs / 60 ) % 60);
  var seconds = parseFloat(Math.abs(secs % 60).toFixed(0));
  
  return {"hours" : hours, "minutes" : minutes, "seconds" : seconds};
};

/* format a tweet - replaces @name by a link to the profile, #hashtag, etc. */
IriSP.formatTweet = function(tweet) {
  var rNickname = /@(\w+)/gi; // matches a @handle
  var rHashtag = /#(\w+)/gi;  // matches a hashtag
  var rUrl = /((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi; // copied from http://codegolf.stackexchange.com/questions/464/shortest-url-regex-match-in-javascript/480#480
  
  var i1 = tweet.replace(rUrl, "<a href='$1'>$1</a>");
  var i2 = i1.replace(rNickname, "<a href='http://twitter.com/$1'>@$1</a>");
  var i3 = i2.replace(rHashtag, "<a href='http://twitter.com/search?q=%23$1'>#$1</a>");

  return i3;
};

/* for ie compatibility
if (Object.prototype.__defineGetter__&&!Object.defineProperty) {
   Object.defineProperty=function(obj,prop,desc) {
      if ("get" in desc) obj.__defineGetter__(prop,desc.get);
      if ("set" in desc) obj.__defineSetter__(prop,desc.set);
   }
}
*/