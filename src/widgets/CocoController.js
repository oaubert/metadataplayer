/* Displays Play and Pause buttons, Search Button and Form, Volume Control */

IriSP.Widgets.CocoController = function (player, config) {
    IriSP.Widgets.Widget.call(this, player, config);
};

IriSP.Widgets.CocoController.prototype = new IriSP.Widgets.Widget();

IriSP.Widgets.CocoController.prototype.defaults = {
};

IriSP.Widgets.CocoController.prototype.template =
    '<div class="Ldt-CocoCtrl">'
    + '<div class="Ldt-CocoCtrl-button Ldt-CocoCtrl-Play Ldt-CocoCtrl-Play-PlayState Ldt-TraceMe" title="{{l10n.play_pause}}"></div>'
    + '<div class="Ldt-CocoCtrl-Time">'
    + '  <div class="Ldt-CocoCtrl-Time-Elapsed" title="{{l10n.elapsed_time}}">--:--</div>'
    + '  <div class="Ldt-CocoCtrl-Time-Separator">/</div>'
    + '  <div class="Ldt-CocoCtrl-Time-Total" title="{{l10n.total_time}}">--:--</div>'
    + '</div>'
    + '<div class="Ldt-CocoCtrl-Right">'
    + '   <div class="Ldt-CocoCtrl-Social">'
    + '       <div class="Ldt-CocoCtrl-button Ldt-CocoCtrl-Twitter-Button Ldt-TraceMe" title="{{l10n.share_twitter}}"></div>'
    + '       <div class="Ldt-CocoCtrl-button Ldt-CocoCtrl-Facebook-Button Ldt-TraceMe" title="{{l10n.share_facebook}}"></div>'
    + '   </div>'
    + '   <div class="Ldt-CocoCtrl-button Ldt-CocoCtrl-Fullscreen-Button Ldt-TraceMe" title="{{l10n.fullscreen}}"></div>'
    + '   <div class="Ldt-CocoCtrl-button Ldt-CocoCtrl-Sound" title="{{l10n.volume_control}}"></div>'
    + '   <div class="Ldt-Ctrl-Volume-Control" title="{{l10n.volume_control}}">'
    + '        <div class="Ldt-Ctrl-Volume-Bar"></div>'
    + '   </div>'
    + '</div>'
    + '</div>';

IriSP.Widgets.CocoController.prototype.messages = {
    en: {
        play_pause: "Play/Pause",
        play: "Play",
        pause: "Pause",
        mute: "Mute",
        unmute: "Unmute",
        elapsed_time: "Elapsed time",
        total_time: "Total duration",
        volume: "Volume",
        volume_control: "Volume control",
        fullscreen: "Fullscreen mode"
    },
    fr: {
        play_pause: "Lecture/Pause",
        play: "Lecture",
        pause: "Pause",
        elapsed_time: "Temps écoulé",
        total_time: "Durée totale",
        volume: "Niveau sonore",
        volume_control: "Réglage du niveau sonore",
        fullscreen: "Mode plein écran"
    }
};

IriSP.Widgets.CocoController.prototype.draw = function () {
    var _this = this;
    this.renderTemplate();

    // Define blocks
    this.$playButton = this.$.find(".Ldt-CocoCtrl-Play");
    this.$searchBlock = this.$.find(".Ldt-CocoCtrl-Search");
    this.$searchInput = this.$.find(".Ldt-CocoCtrl-SearchInput");
    this.$volumeBar = this.$.find(".Ldt-CocoCtrl-Volume-Bar");
    this.$timeElapsed = this.$.find(".Ldt-CocoCtrl-Time-Elapsed");
    this.$timeTotal = this.$.find(".Ldt-CocoCtrl-Time-Total");

    // handle events
    this.onMediaEvent("play", "playButtonUpdater");
    this.onMediaEvent("pause", "playButtonUpdater");
    this.onMediaEvent("volumechange", "volumeUpdater");
    this.onMediaEvent("timeupdate", "timeDisplayUpdater");
    this.onMediaEvent("loadedmetadata", "volumeUpdater");

    // handle clicks
    this.$playButton.click(this.functionWrapper("playHandler"));

    // Fullscreen handling
    this.$.find(".Ldt-CocoCtrl-Fullscreen-Button").click(this.functionWrapper("toggleFullscreen"));
    var fullscreen_event_name = IriSP.getFullscreenEventname();
    if (fullscreen_event_name) {
        document.addEventListener(fullscreen_event_name, function () {
            if (IriSP.isFullscreen() && IriSP.getFullscreenElement() == _this.$[0]) {
                _this.$.addClass("Ldt-Fullscreen-Element");
            } else {
                _this.$.removeClass("Ldt-Fullscreen-Element");
            }
        });
    };

    var _volctrl = this.$.find(".Ldt-CocoCtrl-Volume-Control");
    this.$.find('.Ldt-CocoCtrl-Sound')
        .click(this.functionWrapper("muteHandler"))
        .mouseover(function () {
            _volctrl.show();
        })
        .mouseout(function () {
            _volctrl.hide();
        });
    _volctrl.mouseover(function () {
        _volctrl.show();
    }).mouseout(function () {
        _volctrl.hide();
    });

    // Allow Volume Cursor Dragging
    this.$volumeBar.slider({
        slide: function (event, ui) {
            _this.$volumeBar.attr("title", _this.l10n.volume + ': ' + ui.value + '%');
            _this.media.setVolume(ui.value / 100);
        },
        stop: this.functionWrapper("volumeUpdater")
    });

    this.timeDisplayUpdater(new IriSP.Model.Time(0));
};

/* Update the elasped time div */
IriSP.Widgets.CocoController.prototype.timeDisplayUpdater = function (_time) {
    var _totalTime = this.media.duration;
    this.$timeElapsed.html(_time.toString());
    this.$timeTotal.html(_totalTime.toString());
};

/* update the icon of the button - separate function from playHandler
   because in some cases (for instance, when the user directly clicks on
   the jwplayer window) we have to change the icon without playing/pausing
*/
IriSP.Widgets.CocoController.prototype.playButtonUpdater = function () {
    if (this.media.getPaused()) {
        /* the background sprite is changed by adding/removing the correct classes */
        this.$playButton
            .attr("title", this.l10n.play)
            .removeClass("Ldt-CocoCtrl-Play-PauseState")
            .addClass("Ldt-CocoCtrl-Play-PlayState");
    } else {
        this.$playButton
            .attr("title", this.l10n.pause)
            .removeClass("Ldt-CocoCtrl-Play-PlayState")
            .addClass("Ldt-CocoCtrl-Play-PauseState");
    }
};

//FullScreen
IriSP.Widgets.CocoController.prototype.toggleFullscreen = function () {
    if (IriSP.isFullscreen()) {
        IriSP.setFullScreen(this.$[0], false);
    } else {
        IriSP.setFullScreen(this.$[0], true);
    }
};

IriSP.Widgets.CocoController.prototype.playHandler = function () {
    if (this.media.getPaused()) {
        this.media.play();
    } else {
        this.media.pause();
    }
};

IriSP.Widgets.CocoController.prototype.muteHandler = function () {
    this.media.setMuted(!this.media.getMuted());
};

IriSP.Widgets.CocoController.prototype.volumeUpdater = function () {
    var _muted = this.media.getMuted(),
        _vol = this.media.getVolume();
    if (_vol === false) {
        _vol = .5;
    }
    var _soundCtl = this.$.find(".Ldt-CocoCtrl-Sound");
    _soundCtl.removeClass("Ldt-CocoCtrl-Sound-Mute Ldt-CocoCtrl-Sound-Half Ldt-CocoCtrl-Sound-Full");
    if (_muted) {
        _soundCtl.attr("title", this.l10n.unmute)
            .addClass("Ldt-CocoCtrl-Sound-Mute");
    } else {
        _soundCtl.attr("title", this.l10n.mute)
            .addClass(_vol < .5 ? "Ldt-CocoCtrl-Sound-Half" : "Ldt-CocoCtrl-Sound-Full");
    }
    this.$volumeBar.slider("value", _muted ? 0 : 100 * _vol);
};
