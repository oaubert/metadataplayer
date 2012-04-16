/* To wrap a player the develop should create a new class derived from
the IriSP.PopcornReplacement.player and defining the correct functions */

/** allocine player wrapper */
IriSP.PopcornReplacement.allocine = function(container, options) {
//    console.log("Calling allocine player");
    /* appel du parent pour initialiser les structures communes à tous les players */
    IriSP.PopcornReplacement.player.call(this, container, options);   
    
    var _this = this;

    /* Définition des fonctions de l'API -  */

    this.playerFns = {
        play : function() {
            return _this.apiCall("play");
        },
        pause : function() {
            return _this.apiCall("pause");
        },
        getPosition : function() {
            return _this.apiCall("getSeek","return") || 0;
        },
        seek : function(pos) {
            return _this.apiCall("seek",pos);
        },
        getMute : function() {
            return _this.apiCall("getMute","return");
        },
        setMute : function(p) {
            return _this.apiCall("setMute", p);
        }
    }

    window.onReady = IriSP.wrap(this, this.ready);
    window.onAllocineStateChange = IriSP.wrap(this, this.stateHandler);
    window.onTime = IriSP.wrap(this, this.progressHandler);
    
    var _videoUrl = (
        typeof options.directVideoPath == "string"
        ? options.directVideoPath
        : IriSP.get_aliased(IriSP.__jsonMetadata["medias"][0], ["href","url"])
    );
    var _flashVars = {
        "streamFMS" : true,
        "adVast" : false,
        "lg" : "fr_cinecast",
        "autoPlay" : options.autoPlay,
        "directVideoTitle" : "",
        "urlAcData" : options.urlAcData,
        "directVideoPath" : _videoUrl,
        "host" : "http://allocine.fr"
    }
    
    if (typeof IriSP.__jsonMetadata["medias"][0].meta == "object" && typeof IriSP.__jsonMetadata["medias"][0].meta.subtitles == "string") {
        _flashVars.subTitlePath = IriSP.__jsonMetadata["medias"][0].meta.subtitles;
    }
    

    var params = {
        "allowScriptAccess" : "always",
        "wmode": "opaque",
        "flashvars" : IriSP.jQuery.param(_flashVars),
        "allowfullscreen" : true
    };
    var atts = {
        id : this.container
    };
    swfobject.embedSWF(options.acPlayerUrl, this.container, options.width, options.height, "10", null, null, params, atts);

};

IriSP.PopcornReplacement.allocine.prototype = new IriSP.PopcornReplacement.player("", {});

IriSP.PopcornReplacement.allocine.prototype.ready = function() {
    this.player = document.getElementById(this.container);
    this.player.addEventListener("onStateChange", "onAllocineStateChange");
    this.player.cueVideoByUrl(this._options.video);
    this.callbacks.onReady();
};

IriSP.PopcornReplacement.allocine.prototype.progressHandler = function(progressInfo) {
    this.callbacks.onTime({
        position: progressInfo.mediaTime
    });
}


IriSP.PopcornReplacement.allocine.prototype.apiCall = function(_method, _arg) {
    if (this.player) {
        try {
            if (typeof _arg == "undefined") {
                return this.player.sendToActionScript(_method);
            } else {
                return this.player.sendToActionScript(_method, _arg);
            }
        } catch(e) {
            console.error('Exception while requesting AcPlayer for "' + _method + (typeof _arg == "undefined" ? '' : '" with argument "' + _arg ) + '"\n', e);
            return false;
        }
    } else {
        return false;
    }
}

IriSP.PopcornReplacement.allocine.prototype.stateHandler = function(state) {
    console.log("stateHandler");
    switch(state) {
        case 1:
            this.callbacks.onPlay();
            break;

        case 2:
            this.callbacks.onPause();
            break;

        case 3:
            this.callbacks.onSeek({
                position: this.player.getCurrentTime()
            });
            break;

        /*
        case 5:
            this.callbacks.onReady();
            break;
        */
    }
    
};