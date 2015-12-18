IriSP.Widgets.EnrichedPlan = function (player, config) {
    var _this = this;
    IriSP.Widgets.Widget.call(this, player, config);
    this.throttledRefresh = IriSP._.throttle(function (full) {
        _this.update_content();
    }, 800, {leading: false});

};

IriSP.Widgets.EnrichedPlan.prototype = new IriSP.Widgets.Widget();

IriSP.Widgets.EnrichedPlan.prototype.messages = {
    en: {
        delete_annotation: "Delete note",
        confirm_delete_message: "You are about to delete {{ annotation.title }}. Are you sure you want to delete it?",
        teacher_notes: "Teacher notes",
        other_notes: "Other Notes",
        own_notes: "Pers. notes",
        slides: "Slides",
        search: "Search...",
        whole_video: "Whole video"
    },
    fr: {
        delete_annotation: "Supprimer la note",
        confirm_delete_message: "Vous allez supprimer {{ annotation.title }}. Êtes-vous certain(e) ?",
        teacher_notes: "Notes Enseignant",
        other_notes: "Notes Autres",
        own_notes: "Notes perso.",
        slides: "Diapo",
        search: "Recherchez...",
        whole_video: "Vidéo entière"
    }
};

IriSP.Widgets.EnrichedPlan.prototype.defaults = {
    // Main type for toc segmentation
    annotation_type: "Slides",
    // If no annotation type list is specified, use all other types
    annotation_types: [],
    show_controls: true,
    show_slides: true,
    show_teacher_notes: true,
    show_other_notes: true,
    show_own_notes: true,
    is_admin: false,
    flat_mode: false,
    group: undefined
};

IriSP.Widgets.EnrichedPlan.prototype.template =
      '<div class="Ldt-EnrichedPlan-Container {{#flat_mode}}Ldt-EnrichedPlan-FlatMode{{/flat_mode}}">'
    + '<div class="Ldt-EnrichedPlan-Content"></div>'
    + '<form class="Ldt-EnrichedPlan-Controls">'
    + '{{#show_controls}}'
    + '<div class="Ldt-EnrichedPlan-ControlMenu">'
    + ' <label for="{{ prefix }}control_menu" class="Ldt-EnrichedPlan-Toggle"></label>'
    + ' <input type="checkbox" class="Ldt-EnrichedPlan-ControlMenuHome" id="{{ prefix }}control_menu"/>'
    + '<ul>'
    + ' <li>'
    + '  <input id="{{prefix}}teacher_note_checkbox" class="Ldt-EnrichedPlan-Control-Checkbox Ldt-EnrichedPlan-Note-Teacher" {{#show_teacher_notes}}checked{{/show_teacher_notes}} type="checkbox">'
    + '  <label for="{{prefix}}teacher_note_checkbox" class="Ldt-EnrichedPlan-Control-Label Ldt-EnrichedPlan-Note-Teacher">{{ l10n.teacher_notes }}</label>'
    + ' </li>'
    + ' <li>'
    + '  <input id="{{prefix}}other_note_checkbox" class="Ldt-EnrichedPlan-Control-Checkbox Ldt-EnrichedPlan-Note-Other" {{#show_other_notes}}checked{{/show_other_notes}} type="checkbox">'
    + '  <label for="{{prefix}}other_note_checkbox" class="Ldt-EnrichedPlan-Control-Label Ldt-EnrichedPlan-Note-Other">{{ l10n.other_notes }}</label>'
    + ' </li>'
    + ' <li>'
    + '  <input id="{{prefix}}own_notes_checkbox" class="Ldt-EnrichedPlan-Control-Checkbox Ldt-EnrichedPlan-Note-Own" {{#show_own_notes}}checked{{/show_own_notes}} type="checkbox">'
    + '  <label for="{{prefix}}own_notes_checkbox" class="Ldt-EnrichedPlan-Control-Label Ldt-EnrichedPlan-Note-Own">{{ l10n.own_notes }}</label>'
    + ' </li>'
    + '{{^flat_mode}}'
    + ' <li>'
    + '  <input id="{{prefix}}slide_display_checkbox" class="Ldt-EnrichedPlan-Control-Checkbox Ldt-EnrichedPlan-Slide-Display" {{#show_slides}}checked{{/show_slides}} type="checkbox">'
    + '  <label for="{{prefix}}slide_display_checkbox" class="Ldt-EnrichedPlan-Control-Label Ldt-EnrichedPlan-Slide-Display">{{ l10n.slides }}<br/>&nbsp;</label>'
    + ' </li>'
    + '{{/flat_mode}}'
    + ' </ul>'
    + '</li>'
    + '</ul>'
    + '</div>'
    + '{{/show_controls}}'
    + '<input class="Ldt-EnrichedPlan-Search-Input {{^show_controls}}Ldt-EnrichedPlan-Search-Input-Full{{/show_controls}}" type="search" incremental placeholder="{{ l10n.search }}"/>'
    + '</form>'
    + '</div>';

IriSP.Widgets.EnrichedPlan.prototype.slideTemplate =
      '<div data-id="{{ id }}" class="Ldt-EnrichedPlan-Slide">'
    + '  <div class="Ldt-EnrichedPlan-SlideItem Ldt-EnrichedPlan-SlideTimecode">{{ begin }}</div>'
    + '  <div data-timecode="{{begintc}}" class="Ldt-EnrichedPlan-SlideItem {{^show_slides}}filtered_out{{/show_slides}} Ldt-EnrichedPlan-SlideThumbnail Ldt-EnrichedPlan-Slide-Display">{{#thumbnail}}<img title="{{ begin }} - {{ atitle }}" src="{{ thumbnail }}">{{/thumbnail}}</div>'
    + '  <div class="Ldt-EnrichedPlan-SlideContent">'
    + '     <div data-timecode="{{begintc}}" class="Ldt-EnrichedPlan-SlideTitle Ldt-EnrichedPlan-SlideTitle{{ level }}" data-level="{{level}}">{{#is_admin}}<div class="adminactions"><a target="_blank" href="{{ admin_url }}" class="editelement">&#x270f;</a> <a data-id="{{id}}" target="_blank" class="level_decr">&nbsp;&lt;&nbsp;</a> <a data-id="{{id}}" target="_blank" class="level_incr">&nbsp;&gt;&nbsp;</a></div>{{/is_admin}}{{ atitle }}</div>'
    + '     <div class="Ldt-EnrichedPlan-SlideNotes">{{{ notes }}}</div>'
    + '  </div>'
    + '</div>';

IriSP.Widgets.EnrichedPlan.prototype.annotationTemplate = '<div title="{{ begin }} - {{ atitle }}" data-id="{{ id }}" data-timecode="{{begintc}}" class="Ldt-EnrichedPlan-SlideItem Ldt-EnrichedPlan-Note {{category}} {{filtered}}"><div class="Ldt-EnrichedPlan-NoteTimecode">{{ begin }}</div><a class="Ldt-EnrichedPlan-Note-Link" href="{{ url }}"><span class="Ldt-EnrichedPlan-Note-Text">{{{ text }}}</span></a> <span class="Ldt-EnrichedPlan-Note-Author">{{ author }}</span> {{#can_edit}}<span class="Ldt-EnrichedPlan-EditControl"><span data-id="{{id}}" class="Ldt-EnrichedPlan-EditControl-Edit"></span></span>{{/can_edit}}{{#is_admin}}<div class="adminactions"><a target="_blank" href="{{ admin_url }}" class="editelement">&#x270f;</a></div>{{/is_admin}}</div>';


/**
 * Initialize the component
 */
IriSP.Widgets.EnrichedPlan.prototype.init_component = function () {
    var _this = this;

    // Get slides here so that it correctly initializes implicit
    // flat_mode if necessary (see template)
    var _slides = this.get_slides();

    // Generate a unique prefix, so that ids of input fields
    // (necessary for label association) are unique too.
    _this.prefix = IriSP.generateUuid();
    _this.renderTemplate();
    var container = _this.$.find('.Ldt-EnrichedPlan-Container');
    var content = _this.$.find('.Ldt-EnrichedPlan-Content');

    container.on("click", "[data-timecode]", function () {
        _this.media.setCurrentTime(Number(this.dataset.timecode));
        IriSP.jQuery(".Ldt-EnrichedPlan-Selected-Timecode").removeClass("Ldt-EnrichedPlan-Selected-Timecode");
        IriSP.jQuery(this).addClass("Ldt-EnrichedPlan-Selected-Timecode");
    });

    container.on("click", ".Ldt-EnrichedPlan-Control-Checkbox", function () {
        var classname = _.first(_.filter(this.classList, function (s) {
            return s != "Ldt-EnrichedPlan-Control-Checkbox";
        }));
        if (classname !== undefined) {
            if (IriSP.jQuery(this).is(':checked')) {
                content.find(".Ldt-EnrichedPlan-Slide ." + classname).removeClass("filtered_out");
            } else {
                content.find(".Ldt-EnrichedPlan-Slide ." + classname).addClass("filtered_out");
            }
        }
    });

    container.on("click", ".Ldt-EnrichedPlan-EditControl-Edit", function () {
        _this.player.trigger("Annotation.edit", this.dataset.id);
    });
    container.on("click", ".Ldt-EnrichedPlan-EditControl-Delete", function () {
        var _annotation = _this.source.getElement(this.dataset.id);
        if (confirm(Mustache.to_html(_this.l10n.confirm_delete_message, { annotation: _annotation }))) {
            _this.source.getAnnotations().removeElement(_annotation);
            _this.player.trigger("Annotation.delete", this.dataset.id);
        }
    });

    function update_level(el, inc) {
        var an = _this.source.getElement(el.dataset.id);
        console.log("Update ", an.title, " to ", an.content.data.level + inc);
        an.content.data.level += inc;
        IriSP.jQuery.ajax({
            url: "/annotation/" + el.dataset.id + "/level/",
            timeout: 2000,
            type: "POST",
            contentType: 'application/json',
            data: JSON.stringify({'level': an.content.data.level}),
            dataType: 'json',
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("An error has occurred making the request: " + errorThrown);
            },
            success: function(data) {
                _this.player.trigger("AnnotationsList.refresh");
            }
        });
    };

    container.on("click", ".level_incr", function () {
        update_level(this, +1);
    }).on("click", ".level_decr", function () {
        update_level(this, -1);
    });

    container.find(".Ldt-EnrichedPlan-Search-Input").on("search", function () {
        var q = IriSP.jQuery(this).val().toLocaleLowerCase();
        if (q === "") {
            // Show all
            content.find(".Ldt-EnrichedPlan-Note").removeClass("non_matching");
        } else {
            content.find(".Ldt-EnrichedPlan-Note").each(function () {
                var node = IriSP.jQuery(this);
                if (node.text().toLocaleLowerCase().indexOf(q) > -1) {
                    node.removeClass("non_matching");
                } else {
                    node.addClass("non_matching");
                }
            });
        }
    });

    return [container, content];
};

IriSP.Widgets.EnrichedPlan.prototype.get_slides = function () {
    var _slides = this.flat_mode ? [] : this.getWidgetAnnotations().sortBy(function (_annotation) {
        return _annotation.begin;
    });
    if (_slides.length == 0) {
        // Enforce flat_mode, so that it is defined in the template
        this.flat_mode = true;
        // No valid segmentation defined. Let's pretend there is a
        // unique global segment.
        var title = this.l10n.whole_video;
        _slides = [ {
            id: "whole",
            title: title,
            begin: 0,
            end: this.media.duration,
            thumbnail: "",
            getTitleOrDescription: function () {
                return title;
            }
        } ];
    };
    return _slides;
};

IriSP.Widgets.EnrichedPlan.prototype.update_content = function () {
    var _this = this;
    var _slides = this.get_slides();

    var _annotations = this.media.getAnnotations().filter(function (a) {
        return a.getAnnotationType().title != _this.annotation_type;
    }).sortBy(function (_annotation) {
        return _annotation.begin;
    });

    if (_this.group) {
        _annotations = _annotations.filter(function (a) {
            return a.meta['coco:group'] == _this.group;
        });
    }
    // Reference annotations in each slide: assume that slide end time is
    // correctly set.
    _slides.forEach(function (slide) {
        slide.annotations = _annotations.filter(function (a) {
            return a.begin >= slide.begin && a.begin < slide.end;
        });
    });

    var container = _this.$.find('.Ldt-EnrichedPlan-Container');
    var content = _this.$.find('.Ldt-EnrichedPlan-Content');
    if (!container.length) {
        // Initialization, render the container template
        var els = _this.init_component();
        container = els[0];
        content = els[1];
    } else {
        // Update: empty the container
        // (Should do an incremental update, TBD)
        content.empty();
    }

    function capitalize(s) {
        // This function is defined in recent versions of _
        return s.replace(/^[a-z]/g, function (match) {
            return match.toUpperCase();
        });
    };

    // Returns the note category: Own, Other, Teacher
    function note_category(a) {
        var category = a.meta["coco:category"] || 'other';
        return capitalize(category);
    };

    _slides.forEach(function (slide) {
        var _html = Mustache.to_html(_this.slideTemplate, {
            id : slide.id,
            atitle : IriSP.textFieldHtml(slide.getTitleOrDescription()),
            level: (slide.content !== undefined && slide.content.data !== undefined) ? (slide.content.data.level || 1) : 1,
            begin : slide.begin.toString(),
            begintc: slide.begin.milliseconds,
            thumbnail: slide.thumbnail,
            show_slides: _this.show_slides,
            is_admin: _this.is_admin,
            // FIXME: find an appropriate way to pass admin_url
            admin_url: '/admin/coco/annotation/' + slide.id,
            notes: slide.annotations.map(function (a) {
                return Mustache.to_html(_this.annotationTemplate, {
                    id: a.id,
                    text: IriSP.textFieldHtml(a.getTitleOrDescription()),
                    url: document.location.href.replace(/#.*$/, '') + '#id=' + a.id + '&t=' + (a.begin / 1000.0),
                    author: a.creator,
                    begin: a.begin.toString(),
                    begintc: a.begin.milliseconds,
                    atitle: a.getTitleOrDescription().slice(0, 20),
                    can_edit: a.meta['coco:can_edit'],
                    is_admin: _this.is_admin,
                    admin_url: '/admin/coco/annotation/' + a.id,
                    category: "Ldt-EnrichedPlan-Note-" + note_category(a),
                    filtered: ((note_category(a) == 'Own' && !_this.show_own_notes)
                                || (note_category(a) == 'Other' && !_this.show_other_notes)
                                || (note_category(a) == 'Teacher' && !_this.show_teacher_notes)) ? 'filtered_out' : ''
                });
            }).join("\n")
        });
        var _el = IriSP.jQuery(_html);
        content.append(_el);
    });
};

IriSP.Widgets.EnrichedPlan.prototype.draw = function () {
    var _this = this;
    _this.init_component();
    _this.update_content();

    _this.onMdpEvent("AnnotationsList.refresh", function () {
        _this.throttledRefresh(false);
    });
};
