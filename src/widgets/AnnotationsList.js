IriSP.Widgets.AnnotationsList = function(player, config) {
    IriSP.Widgets.Widget.call(this, player, config);
    this.lastIds = [];
    var _this = this;
    this.throttledRefresh = IriSP._.throttle(function() {
        _this.refresh(false);
    }, 800);
    this.searchString = false;
    this.lastSearch = false;
};

IriSP.Widgets.AnnotationsList.prototype = new IriSP.Widgets.Widget();

IriSP.Widgets.AnnotationsList.prototype.defaults = {
    pre_draw_callback: function(){
        return this.importUsers();
    },
    /*
     * URL when the annotations are to be reloaded from an LDT-like segment API
     * e.g.
     * http://ldt.iri.centrepompidou.fr/ldtplatform/api/ldt/segments/{{media}}/{{begin}}/{{end}}?callback=?
     */
    ajax_url : false,
    /*
     * number of milliseconds before/after the current timecode when calling the
     * segment API
     */
    ajax_granularity : 600000, 
    default_thumbnail : "",
    /*
     * URL when the annotation is not in the current project, e.g.
     * http://ldt.iri.centrepompidou.fr/ldtplatform/ldt/front/player/{{media}}/{{project}}/{{annotationType}}#id={{annotation}}
     */
    foreign_url : "",
    annotation_type : false,
    refresh_interval : 0,
    limit_count : 20,
    newest_first : false,
    always_visible : false,
    start_visible: true,
    show_audio : true,
    show_filters : false,
    keyword_filter: true,
    date_filter: true,
    user_filter: true,
    segment_filter: true,
    latest_contributions_filter: false,
    current_day_filter: true,
    show_header : false,
    custom_header : false,
    annotations_count_header : true,
    show_creation_date : false,
    show_timecode : true,
    /*
     * Only annotation in the current segment will be displayed. Designed to work with the Segments Widget.
     */
    allow_annotations_deletion: false,
    /*
     * URL to call when deleting annotation. Expects a mustache template with {{annotation_id}}, ex /api/anotations/{{annotation_id}}/
     */
    api_delete_endpoint : "",
    api_delete_method: "DELETE",
    api_users_endpoint: "",
    api_users_method: "GET",
    make_name_string_function: function(params){
        return params.username ? params.username : "Anonymous";
    },
    filter_by_segments: false,
    segment_filter: true,
    segments_annotation_type: "chap",
    /*
     * Set to a username if you only want to display annotations from a given user
     */
    show_only_annotation_from_user: false,
    /*
     * Show a text field that filter annotations by username
     */
    tags : true,
    polemics : [{
        keyword: "++",
        background_color: "#c9ecc6"
    },{
        keyword: "--",
        background_color: "#f9c5c6"
    },{
        keyword: "??",
        background_color: "#cec5f9"
    },{
        keyword: "==",
        background_color: "#f9f4c6"
    }]
};

IriSP.Widgets.AnnotationsList.prototype.importUsers = function(){
    if (!this.source.users_data){
        this.usernames = Array();
        var _this = this,
            _list = this.getWidgetAnnotations(),
            usernames_list_string = "";
        
        _list.forEach(function(_annotation){
            if(_this.usernames.indexOf(_annotation.creator) == -1){
                _this.usernames.push(_annotation.creator);
            }
        });
        this.usernames.forEach(function(_username){
            usernames_list_string+=_username+","
        })
        usernames_list_string = usernames_list_string.substring(0, usernames_list_string.length - 1);
        _url = Mustache.to_html(this.api_users_endpoint, {usernames_list_string: encodeURIComponent(usernames_list_string), usernames_list_length: this.usernames.length});
        return IriSP.jQuery.ajax({
            async: false,
            url: _url,
            type: "GET",
            success: function(_data) {
                _this.source.users_data = _data.objects
            },
            error: function(_xhr, _error, _thrown) {
                console.log(_xhr)
                console.log(_error)
                console.log(_thrown)
            }
        })
    }
}

IriSP.Widgets.AnnotationsList.prototype.messages = {
    en: {
        voice_annotation: "Voice Annotation",
        now_playing: "Now playing...",
        everyone: "Everyone",
        header: "Annotations for this content",
        segment_filter: "All cuttings",
        latest_contributions: "Latest contributions",
        close_widget: "Close",
        confirm: "Confirm",
        cancel: "Cancel",
        annotation_deletion_delete: "You will delete this annotation : ",
        annotation_deletion_sending: "Your deletion request is being sent ... ",
        annotation_deletion_success: "The annotation has been deleted.",
        annotation_deletion_error: "There was an error contacting the server. The annotation has not been deleted."
    },
    fr: {
        voice_annotation: "Annotation Vocale",
        now_playing: "Lecture en cours...",
        everyone: "Tous",
        header: "Annotations sur ce contenu",
        segment_filter: "Tous les segments",
        latest_contributions: "Dernières contributions",
        close_widget: "Fermer",
        confirm: "Confirmer",
        cancel: "Annuler",
        annotation_deletion_delete: "Vous allez supprimer cette annotation: ",
        annotation_deletion_sending: "Votre demande de suppression est en cours d'envoi ... ",
        annotation_deletion_success: "L'annotation a été supprimée.",
        annotation_deletion_error: "Une erreur s'est produite en contactant le serveur. L'annotation n'a pas été supprimée."
    }
};

IriSP.Widgets.AnnotationsList.prototype.template =
    '{{#show_header}}<p class="Ldt-AnnotationsList-header">'
    +     '{{#custom_header}}{{custom_header}}{{/custom_header}}'
    +     '{{^custom_header}}{{l10n.header}}{{/custom_header}}'
    + '</p>{{/show_header}}'
    + '<div class="Ldt-AnnotationsListWidget">'
    +     '<div class="Ldt-AnnotationsList-ScreenMain">'
    +         '{{#show_filters}}'
    +         '<div class="Ldt-AnnotationsList-Filters">'
    +             '{{#keyword_filter}}<input class="Ldt-AnnotationsList-filter-text" id="Ldt-AnnotationsList-keywordsFilter" type="text" value=""></input>{{/keyword_filter}}'
    +             '{{#user_filter}}<select class="Ldt-AnnotationsList-filter-dropdown" id="Ldt-AnnotationsList-userFilter"><option selected value="">{{l10n.everyone}}</option></select>{{/user_filter}}'
    +             '{{#date_filter}}<label class="Ldt-AnnotationsList-filter-date">Date: <input id="Ldt-AnnotationsList-dateFilter" type="text"></input></label>{{/date_filter}}'
    +             '{{#segment_filter}}<label class="Ldt-AnnotationsList-filter-checkbox"><input type="checkbox" id="Ldt-AnnotationsList-ignoreSegmentsFilter">{{l10n.segment_filter}}</label>{{/segment_filter}}'
    +             '{{#latest_contributions_filter}}<label class="Ldt-AnnotationsList-filter-checkbox"><input type="checkbox" id="Ldt-AnnotationsList-latestContributionsFilter">{{l10n.latest_contributions}}</label>{{/latest_contributions_filter}}'
    +         '</div>'
    +         '{{/show_filters}}'
    +         '{{#show_audio}}<div class="Ldt-AnnotationsList-Audio"></div>{{/show_audio}}'
    +         '<ul class="Ldt-AnnotationsList-ul">'
    +         '</ul>'
    +     '</div>'    
    +     '{{#allow_annotations_deletion}}'
    +     '<div id="{{id}}" class="Ldt-AnnotationsList-Screen Ldt-AnnotationsList-ScreenDelete">'
    +         '<a title="{{l10n.close_widget}}" class="Ldt-AnnotationsList-Close" href="#"></a>' 
    +         '<ul class="Ldt-AnnotationsList-ul-ToDelete"></ul>'
    +         '{{l10n.annotation_deletion_delete}} <a class="Ldt-AnnotationsList-ConfirmDelete">{{l10n.confirm}}</a> <a class="Ldt-AnnotationsList-CancelDelete">{{l10n.cancel}}</a>'
    +     '</div>'
    +     '<div id="{{id}}" class="Ldt-AnnotationsList-Screen Ldt-AnnotationsList-ScreenSending">'
    +         '<a title="{{l10n.close_widget}}" class="Ldt-AnnotationsList-Close" href="#"></a>'  
    +         '{{l10n.annotation_deletion_sending}}'
    +     '</div>'
    +     '<div id="{{id}}" class="Ldt-AnnotationsList-Screen Ldt-AnnotationsList-ScreenSuccess">'
    +         '<a title="{{l10n.close_widget}}" class="Ldt-AnnotationsList-Close" href="#"></a>'  
    +         '{{l10n.annotation_deletion_success}}'
    +     '</div>'
    +     '<div id="{{id}}" class="Ldt-AnnotationsList-Screen Ldt-AnnotationsList-ScreenError">'
    +         '<a title="{{l10n.close_widget}}" class="Ldt-AnnotationsList-Close" href="#"></a>'  
    +         '{{l10n.annotation_deletion_error}}'
    +     '</div>'
    +     '{{/allow_annotations_deletion}}'
    + '</div>';

IriSP.Widgets.AnnotationsList.prototype.annotationTemplate = 
    '<li class="Ldt-AnnotationsList-li Ldt-TraceMe" trace-info="annotation-id:{{id}}, media-id:{{media_id}}" style="{{specific_style}}">'
    + '<div id="{{id}}" class="Ldt-AnnotationsList-ThumbContainer Ldt-AnnotationsList-Annotation-Screen Ldt-AnnotationsList-Annotation-ScreenMain">'
    + '<a href="{{url}}" draggable="true">'
    + '<img class="Ldt-AnnotationsList-Thumbnail" src="{{thumbnail}}" />'
    + '</a>'
    + '</div>'
    + '{{#allow_annotations_deletion}}'
    + '<div id={{id}} class="Ldt-AnnotationsList-DeleteButton">&#10006;</div>'
    + '{{/allow_annotations_deletion}}'
    + '{{#show_timecode}}<div class="Ldt-AnnotationsList-Duration">{{begin}} - {{end}}</div>{{/show_timecode}}'
    + '<h3 class="Ldt-AnnotationsList-Title" draggable="true">'
    + '<a {{#url}} href="{{url}}" {{/url}}>{{{htitle}}}</a>'
    + '</h3>'
    + '<p class="Ldt-AnnotationsList-Description">{{{hdescription}}}</p>'
    + '{{#created}}'
    + '<div class="Ldt-AnnotationsList-CreationDate">{{{created}}}</div>'
    + '{{/created}}'
    + '{{#tags.length}}'
    + '<ul class="Ldt-AnnotationsList-Tags">'
    + '{{#tags}}'
    + '{{#.}}'
    + '<li class="Ldt-AnnotationsList-Tag-Li">'
    + '<span>{{.}}</span>'
    + '</li>'
    + '{{/.}}'
    + '{{/tags}}'
    + '</ul>'
    + '{{/tags.length}}'
    + '{{#audio}}<div class="Ldt-AnnotationsList-Play" data-annotation-id="{{id}}">{{l10n.voice_annotation}}</div>{{/audio}}'    
    + '</li>';

// obj.url = this.project_url + "/" + media + "/" + annotations[i].meta.project
// + "/" + annotations[i].meta["id-ref"] + '#id=' + annotations[i].id;

IriSP.Widgets.AnnotationsList.prototype.ajaxSource = function() {
    var _currentTime = this.media.getCurrentTime(),
        _duration = this.media.duration;
    this.lastAjaxQuery = _currentTime;
    var _url = Mustache.to_html(this.ajax_url, {
        media : this.source.currentMedia.id,
        begin : Math.max(0, _currentTime - this.ajax_granularity),
        end : Math.min(_duration.milliseconds, _currentTime + this.ajax_granularity)
    });
    this.currentSource = this.player.loadMetadata(IriSP._.defaults({
        "url" : _url
    }, this.metadata));
};

IriSP.Widgets.AnnotationsList.prototype.showScreen = function(_screenName) {
    this.$.find('.Ldt-AnnotationsList-Screen' + _screenName).show()
        .siblings().hide();
}

IriSP.Widgets.AnnotationsList.prototype.ajaxMashup = function() {
    var _currentTime = this.media.getCurrentTime();
    var _currentAnnotation = this.source.currentMedia.getAnnotationAtTime(_currentTime);
    if (typeof _currentAnnotation !== "undefined" && _currentAnnotation.id !== this.lastMashupAnnotation) {
        this.lastMashupAnnotation = _currentAnnotation.id;
        var _currentMedia = _currentAnnotation.getMedia(),
            _url = Mustache.to_html(this.ajax_url, {
                media : _currentMedia.id,
                begin : Math.max(0, _currentAnnotation.annotation.begin.milliseconds - this.ajax_granularity),
                end : Math.min(_currentMedia.duration.milliseconds, _currentAnnotation.annotation.end.milliseconds + this.ajax_granularity)
            });
        this.currentSource = this.player.loadMetadata(IriSP._.defaults({
            "url" : _url
        }, this.metadata));
    }
};

IriSP.Widgets.AnnotationsList.prototype.refresh = function(_forceRedraw) {
    _forceRedraw = (typeof _forceRedraw !== "undefined" && _forceRedraw);
    if (this.currentSource.status !== IriSP.Model._SOURCE_STATUS_READY) {
        return 0;
    }
    var _this = this,
        _currentTime = this.media.getCurrentTime();
    var _list = this.annotation_type ? this.currentSource.getAnnotationsByTypeTitle(this.annotation_type) : this.currentSource.getAnnotations();
    if (this.mashupMode) {
        var _currentAnnotation = this.source.currentMedia.getAnnotationAtTime(_currentTime);
        if (typeof _currentAnnotation !== "undefined") {
            _currentTime = _currentTime - _currentAnnotation.begin + _currentAnnotation.annotation.begin;
            var _mediaId = _currentAnnotation.getMedia().id;
            _list = _list.filter(function(_annotation) {
                return _annotation.getMedia().id === _mediaId;
            });
        }
    }
    _list = _list.filter(function(_annotation) {
        return _annotation.found !== false;
    });
    
    if ((this.filter_by_segments)&&(!(this.show_filters && this.segment_filter && this.ignoresegmentcheckbox_$[0].checked))) {
        /*
         *  A given annotation is considered "in" segment if the middle of it is between the segment beginning and the segment end. 
         *  Note this is meant to be used for "markings" annotations (not segments)
         */
        _segmentsAnnotation = this.currentSource.getAnnotationsByTypeTitle(this.segments_annotation_type)
        if (this.media.getTimeRange()){
            _currentSegments = _segmentsAnnotation.filter(function(_segment){
                return (_this.media.getTimeRange()[0] == _segment.begin && _this.media.getTimeRange()[1] == _segment.end)
            });
        }
        else {
            _currentSegments = _segmentsAnnotation.filter(function(_segment){
                return (_currentTime >= _segment.begin && _currentTime <= _segment.end)
            });
        }
        if (_currentSegments.length == 0) {
            _list = _list.filter(function(_annotation){
                return false;
            });
        }
        else {
            _list = _list.filter(function(_annotation){
                _annotation_time = (_annotation.begin+_annotation.end)/2;
                return (_currentSegments[0].begin <= _annotation_time && _currentSegments[0].end >= _annotation_time)
            });
        }
        if(this.annotations_count_header && this.annotations_count != _list.length){
            this.annotations_count = _list.length;
            this.refreshHeader();
        }
    }
    if (this.show_only_annotation_from_user){
        _list = _list.filter(function(_annotation){
           return _annotation.creator == _this.show_only_annotation_from_user;
        });
    }
    if (this.limit_count) {
        /* Get the n annotations closest to current timecode */
        _list = _list.sortBy(function(_annotation) {
            return Math.abs((_annotation.begin + _annotation.end) / 2 - _currentTime);
        }).slice(0, this.limit_count);
    }
    
    if (this.newest_first) {
        _list = _list.sortBy(function(_annotation) {
            return -_annotation.created.valueOf();
        });
    } else {
        _list = _list.sortBy(function(_annotation) {
            return _annotation.begin;
        });
    }
    
    if (this.show_filters){
        if (this.user_filter){
            _username = this.userselect_$[0].options[this.userselect_$[0].selectedIndex].value;
            if (_username != "false")
            {
                _list = _list.filter(function(_annotation){
                    return _annotation.creator == _username
                })
            }
        }
        if (this.keyword_filter){
        _keyword = this.keywordinput_$[0].value;
            if (_keyword != ""){
                _list = _list.filter(function(_annotation){
                   return _annotation.description.toLowerCase().match(_keyword.toLowerCase());
                });
            }
        }
        if (this.date_filter){
            if(this.datefilterinput_$[0].value != ""){
                _date = this.datefilterinput_$.datepicker("getDate");
                _list = _list.filter(function(_annotation){
                    return ((_annotation.created.getDate() == _date.getDate())&&(_annotation.created.getMonth() == _date.getMonth())&&(_annotation.created.getFullYear() == _date.getFullYear()));
                });
            }
        }
        if (this.latest_contributions_filter && this.latestcontributionscheckbox_$[0].checked){
            _list = _list.sortBy(function(_annotation) {
                return -_annotation.created.valueOf();
            });
            this.usernames.forEach(function(_user){
                
                latest_ann = _list.filter(function(_annotation){
                    return _annotation.creator == _user;
                })[0];
                _list = _list.filter(function(_annotation){
                    return _annotation.id == (latest_ann ? latest_ann.id : false) || _annotation.creator != _user;
                });
            });
        }
        
    }
    
    var _ids = _list.idIndex;
    
    if (_forceRedraw || !IriSP._.isEqual(_ids, this.lastIds) || this.searchString !== this.lastSearch) {
        /* This part only gets executed if the list needs updating */
        this.lastSearch = this.searchString;
        this.lastIds = _ids;
        this.list_$.html("");
        _list.forEach(function(_annotation) {
            var _url = (
                ( typeof _annotation.url !== "undefined" && _annotation.url)
                ? _annotation.url
                : (
                    ( typeof _this.source.projectId !== "undefined" && typeof _annotation.project !== "undefined" && _annotation.project && _this.source.projectId !== _annotation.project )
                    ? Mustache.to_html(
                        _this.foreign_url,
                        {
                            project : _annotation.project,
                            media : _annotation.media.id,
                            annotation : _annotation.id,
                            annotationType : _annotation.annotationType.id
                        }
                    )
                    : document.location.href.replace(/#.*$/,'') + '#id=' + _annotation.id
                    )
            );
            var _title = "",
                _description = _annotation.description,
                _thumbnail = (typeof _annotation.thumbnail !== "undefined" && _annotation.thumbnail ? _annotation.thumbnail : _this.default_thumbnail)
            
            // Update : display creator
            if (_annotation.creator) {
                var _users = _this.source.users_data.filter(function(_user_data){
                    return _user_data.username == _annotation.creator
                }),
                    _user = {};
                if (_users.length == 0){
                    _user.username = _annotation.creator
                }
                else{
                    _user = _users[0]
                }
                _title = _this.make_name_string_function(_user);
            }
            if (_annotation.title) {
                var tempTitle = _annotation.title;
                if( tempTitle.substr(0, _title.length + 1) == (_title + ":") ){
                    _title = "";
                }
                _title = _title + ( (_title=="") ? "" : ": ") + _annotation.title;
            }
            var _bgcolor;
            IriSP._(_this.polemics).each(function(_polemic) {
                var _rgxp = IriSP.Model.regexpFromTextOrArray(_polemic.keyword, true);
                if (_rgxp.test(_title + " " + _description)) {
                    _bgcolor = _polemic.background_color;
                }
            });
            var _created = false;
            if (_this.show_creation_date) {
                _created = _annotation.created.toLocaleDateString()+", "+_annotation.created.toLocaleTimeString();
            }
            if(this.tags == true){
                var _tags = _annotation.getTagTexts();
            }
            else {
                var _tags = false;
            }
            var _data = {
                id : _annotation.id,
                media_id : _annotation.getMedia().id,
                htitle : IriSP.textFieldHtml(_title),
                hdescription : IriSP.textFieldHtml(_description),
                begin : _annotation.begin.toString(),
                end : _annotation.end.toString(),
                created : _created,
                show_timecode : _this.show_timecode,
                thumbnail : _thumbnail,
                url : _url,
                tags : _tags,
                specific_style : (typeof _bgcolor !== "undefined" ? "background-color: " + _bgcolor : ""),
                l10n: _this.l10n,
                allow_annotations_deletion: _this.allow_annotations_deletion
            };
            if (_this.show_audio && _annotation.audio && _annotation.audio.href && _annotation.audio.href != "null") {
                _data.audio = true;
                if (!_this.jwplayers[_annotation.id]) {
                    var _audiofile = _annotation.audio.href;
                    if (_this.audio_url_transform) {
                        _audiofile = _this.audio_url_transform(_annotation.audio.href);
                    }
                    var _tmpId = "jwplayer-" + IriSP.Model.getUID();
                    _this.jwplayers[_annotation.id] = _tmpId;
                    _this.$.find(".Ldt-AnnotationsList-Audio").append(IriSP.jQuery("<div>").attr("id", _tmpId));
                    jwplayer(_tmpId).setup({
                        flashplayer: IriSP.getLib("jwPlayerSWF"),
                        file: _audiofile,
                        fallback: false,
                        primary: "flash",
                        controls: false,
                        width: 1,
                        height: 1,
                        events: {
                            onPause: function() {
                                _this.$.find(".Ldt-AnnotationsList-Play[data-annotation-id=" + _annotation.id + "]").text(_this.l10n.voice_annotation);
                            },
                            onPlay: function() {
                                _this.$.find(".Ldt-AnnotationsList-Play[data-annotation-id=" + _annotation.id + "]").text(_this.l10n.now_playing);
                            }
                        }
                    });
                }
            }
            var _html = Mustache.to_html(_this.annotationTemplate, _data),
                _el = IriSP.jQuery(_html),
                _onselect = function() {
                    _this.$.find('.Ldt-AnnotationsList-li').removeClass("selected");
                    _el.addClass("selected");
                },
                _onunselect = function() {
                    _this.$.find('.Ldt-AnnotationsList-li').removeClass("selected");
                };
            _el.mouseover(function() {
                    _annotation.trigger("select");
                })
                .mouseout(function() {
                    _annotation.trigger("unselect");
                })
                .click(function() {
                    _annotation.trigger("click");
                })
                .appendTo(_this.list_$);
            IriSP.attachDndData(_el.find("[draggable]"), {
                title: _title,
                description: _description,
                uri: _url,
                image: _annotation.thumbnail
            });
            _el.on("remove", function() {
                _annotation.off("select", _onselect);
                _annotation.off("unselect", _onunselect);
            });
            _annotation.on("select", _onselect);
            _annotation.on("unselect", _onunselect);
        });
        
        /* Correct the empty tag bug */
        this.$.find('.Ldt-AnnotationsList-Tag-Li').each(function() {
            var _el = IriSP.jQuery(this);
            if (!_el.text().replace(/(^\s+|\s+$)/g,'')) {
                _el.remove();
            }
        });
    
        this.$.find('.Ldt-AnnotationsList-Tag-Li').click(function() {
            _this.source.getAnnotations().search(IriSP.jQuery(this).text().replace(/(^\s+|\s+$)/g,''));
        });
        
        this.$.find(".Ldt-AnnotationsList-Play").click(function() {
            var _el = IriSP.jQuery(this),
                _annid = _el.attr("data-annotation-id");
            if (_this.jwplayers[_annid]) {
                jwplayer(_this.jwplayers[_annid]).play();
            }
            _this.media.pause();
        });
        
        if (this.source.getAnnotations().searching) {
            var rx = _this.source.getAnnotations().regexp || false;
            this.$.find(".Ldt-AnnotationsList-Title a, .Ldt-AnnotationsList-Description").each(function() {
                var _$ = IriSP.jQuery(this);
                _$.html(IriSP.textFieldHtml(_$.text(), rx));
            });
        }

        this.$.find(".Ldt-AnnotationsList-DeleteButton").click(_this.functionWrapper("onDeleteClick"))
    }
    
    if (this.ajax_url) {
        if (this.mashupMode) {
            this.ajaxMashup();
        } else {
            if (Math.abs(_currentTime - this.lastAjaxQuery) > (this.ajax_granularity)) {
                this.ajaxSource();
            }
        }
    }
    
    return _list.length;
};

IriSP.Widgets.AnnotationsList.prototype.onDeleteClick = function(event){
    
    ann_id = event.target.id;
    delete_preview_$ = this.$.find(".Ldt-AnnotationsList-ul-ToDelete");
    delete_preview_$.html("");
    _list = this.getWidgetAnnotations()
    _list = _list.filter(function(_annotation){
        return _annotation.id == ann_id
    })
    var _annotation = _list[0],
        _title = "",
        _this = this;
    if (_annotation.creator) {
        var _users = _this.source.users_data.filter(function(_user_data){
            return _user_data.username == _annotation.creator
        }),
            _user = {};
        if (_users.length == 0){
            _user.username = _annotation.creator
        }
        else{
            _user = _users[0]
        }
        _title = _this.make_name_string_function(_user);
    }
    if (_annotation.title) {
        var tempTitle = _annotation.title;
        if( tempTitle.substr(0, _title.length + 1) == (_title + ":") ){
            _title = "";
        }
        _title = _title + ( (_title=="") ? "" : ": ") + _annotation.title;
    }
    var _created = false;
    if (this.show_creation_date) {
        _created = _annotation.created.toLocaleDateString()+", "+_annotation.created.toLocaleTimeString();
    }
    var _data = {
            id : _annotation.id,
            media_id : _annotation.getMedia().id,
            htitle : IriSP.textFieldHtml(_title),
            hdescription : IriSP.textFieldHtml(_annotation.description),
            begin : _annotation.begin.toString(),
            end : _annotation.end.toString(),
            created : _created,
            show_timecode : this.show_timecode,
            tags : false,
            l10n: this.l10n,
            allow_annotations_deletion: false
    }
    _html = Mustache.to_html(this.annotationTemplate, _data)
    delete_preview_$.html(_html)
    
    this.$.find(".Ldt-AnnotationsList-ConfirmDelete").click(function(){
        _this.sendDelete(ann_id);
    });
    
    this.showScreen("Delete");    
}

IriSP.Widgets.AnnotationsList.prototype.refreshHeader = function() {
    var annotation_count_string = " (" + this.annotations_count +" annotations)";
    this.$.find('.Ldt-AnnotationsList-header').html("");
    this.$.find('.Ldt-AnnotationsList-header').html(
        this.custom_header && typeof this.custom_header == "string"? this.custom_header + annotation_count_string : this.l10n.header + annotation_count_string
    );
}

IriSP.Widgets.AnnotationsList.prototype.hide = function() {
    var _this = this;
    if (this.visible){
        this.visible = false;
        this.widget_$.slideUp(function(){
            _this.$.find('.Ldt-AnnotationsList-header').hide();            
        });
        this.showScreen("Main")
    }
}

IriSP.Widgets.AnnotationsList.prototype.show = function() {
    if(!this.visible){
        this.visible = true;
        this.$.find('.Ldt-AnnotationsList-header').show();
        this.widget_$.slideDown();
        this.showScreen("Main")
    }
}


IriSP.Widgets.AnnotationsList.prototype.toggle = function() {
    if (!this.always_visible) {
        if (this.visible) {
            this.hide();
        } else {
            this.show();
        }
    }
};

IriSP.Widgets.AnnotationsList.prototype.revertToMainScreen = function(){
    if (this.$.find(".Ldt-AnnotationsList-ScreenMain").is(":hidden")){
        this.showScreen("Main");
    }
}

IriSP.Widgets.AnnotationsList.prototype.sendDelete = function(id){
    var _this = this,
        _url = Mustache.to_html(this.api_delete_endpoint, {annotation_id: id})
    
    IriSP.jQuery.ajax({
        url: _url,
        type: this.api_delete_method,
        contentType: 'application/json',
        success: function(_data) {
            _this.showScreen('Success');
            window.setTimeout(_this.functionWrapper("revertToMainScreen"),(_this.after_send_timeout || 2000));
            _this.currentSource.getAnnotations().removeId(id);
            _this.player.trigger("AnnotationsList.refresh");
        },
        error: function(_xhr, _error, _thrown) {
            IriSP.log("Error when sending annotation", _thrown);
            _this.showScreen('Error');
            window.setTimeout(_this.functionWrapper("revertToMainScreen"),(_this.after_send_timeout || 2000));
        }
    });
    this.showScreen('Sending');
}

IriSP.Widgets.AnnotationsList.prototype.draw = function() {
    this.jwplayers = {};
    this.mashupMode = (this.media.elementType === "mashup");
    
    this.renderTemplate();
    
    var _this = this;
    
    this.list_$ = this.$.find(".Ldt-AnnotationsList-ul");
    this.widget_$ = this.$.find(".Ldt-AnnotationsListWidget");
    
    if (this.show_filters){
        if (this.user_filter){
            this.userselect_$ = this.$.find("#Ldt-AnnotationsList-userFilter");
            this.userselect_$.change(function(){
                _this.player.trigger("AnnotationsList.refresh");
            });
            this.userselect_$.html("<option selected value='false'>"+this.l10n.everyone+"</option>");
            this.usernames.forEach(function(_user){
                _this.userselect_$.append("<option value='"+_user+"'>"+_user+"</option>");
            });
        }
        if (this.keyword_filter){
            this.keywordinput_$ = this.$.find("#Ldt-AnnotationsList-keywordsFilter");
            this.keywordinput_$.keyup(function(){
                _this.player.trigger("AnnotationsList.refresh");
            });
            
        }
        if (this.segment_filter){
            this.ignoresegmentcheckbox_$ = this.$.find("#Ldt-AnnotationsList-ignoreSegmentsFilter");
            this.ignoresegmentcheckbox_$.click(function(){
                _this.player.trigger("AnnotationsList.refresh");
            });
        }
        if(this.date_filter){
            this.datefilterinput_$ = this.$.find("#Ldt-AnnotationsList-dateFilter");
            this.datefilterinput_$.datepicker({ dateFormat: 'dd/mm/yy' });
            this.datefilterinput_$.change(function(){
                _this.player.trigger("AnnotationsList.refresh")
            })
            if (this.current_day_filter){
                currentDate = new Date();
                this.datefilterinput_$.datepicker("setDate",currentDate);
            }
        }
        if(this.latest_contributions_filter){
            this.latestcontributionscheckbox_$ = this.$.find("#Ldt-AnnotationsList-latestContributionsFilter");
            this.latestcontributionscheckbox_$.click(function(){
                _this.player.trigger("AnnotationsList.refresh");
            });
        }
    }
    
    this.source.getAnnotations().on("search", function(_text) {
        _this.searchString = _text;
        if (_this.source !== _this.currentSource) {
            _this.currentSource.getAnnotations().search(_text);
            _this.throttledRefresh();
        }
    });
    this.source.getAnnotations().on("found", function() {
        _this.throttledRefresh();
    });
    this.source.getAnnotations().on("not-found", function() {
        _this.throttledRefresh();
    });
    this.source.getAnnotations().on("clear-search", function() {
        _this.searchString = false;
        if (_this.source !== _this.currentSource) {
            _this.currentSource.getAnnotations().trigger("clear-search");
        }
    });
    
    this.$.find(".Ldt-AnnotationsList-Close").click(function(){
        _this.showScreen("Main");
    })
    
    this.source.getAnnotations().on("search-cleared", function() {
        _this.throttledRefresh();
    });
    
    this.onMdpEvent("AnnotationsList.refresh", function() {
        if (_this.ajax_url) {
            if (_this.mashupMode) {
                _this.ajaxMashup();
            } else {
                _this.ajaxSource();
            }
        }
        _this.throttledRefresh();
    });
    
    if (this.ajax_url) {
        if (this.mashupMode) {
            this.ajaxMashup();
        } else {
            this.ajaxSource();
        }
    } else {
        this.currentSource = this.source;
    }
    
    if (this.refresh_interval) {
        window.setInterval(function() {
            _this.currentSource.get();
        }, this.refresh_interval);
    }
    
    if (this.annotations_count_header){
        this.annotations_count = false;
    }
    
    this.onMdpEvent("AnnotationsList.toggle","toggle");
    this.onMdpEvent("AnnotationsList.hide", "hide");
    this.onMdpEvent("AnnotationsList.show", "show");
    
    this.onMdpEvent("createAnnotationWidget.addedAnnotation", this.throttledRefresh);
    var _events = [
        "timeupdate",
        "seeked",
        "loadedmetadata",
        "settimerange"
    ];
    for (var _i = 0; _i < _events.length; _i++) {
        this.onMediaEvent(_events[_i], this.throttledRefresh);
    }
    
    this.throttledRefresh();
    
    this.showScreen("Main");
    this.$.find(".Ldt-AnnotationsList-CancelDelete").click(function(){
        _this.showScreen("Main")
    });
    
    this.visible = true;
    if (!this.start_visible){
        this.hide();
    }
};
