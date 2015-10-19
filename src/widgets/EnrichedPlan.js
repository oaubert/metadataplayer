/* TODO
- add callbacks
 */

IriSP.Widgets.EnrichedPlan = function (player, config) {
    IriSP.Widgets.Widget.call(this, player, config);
};

IriSP.Widgets.EnrichedPlan.prototype = new IriSP.Widgets.Widget();

IriSP.Widgets.EnrichedPlan.prototype.messages = {
    en: {
        delete_annotation: "Delete note",
        confirm_delete_message: "You are about to delete {{ annotation.title }}. Are you sure you want to delete it?"
    },
    fr: {
        delete_annotation: "Supprimer la note",
        confirm_delete_message: "Vous allez supprimer {{ annotation.title }}. Êtes-vous certain(e) ?"
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
    show_own_notes: true
};

IriSP.Widgets.EnrichedPlan.prototype.template =
      '<div class="Ldt-EnrichedPlan-Container">'
    + '<form class="Ldt-EnrichedPlan-Controls">'
    + '{{#show_controls}}'
    + ' <input id="{{prefix}}teacher_note_checkbox" class="Ldt-EnrichedPlan-Control-Checkbox Ldt-EnrichedPlan-Note-Teacher" {{#show_teacher_notes}}checked{{/show_teacher_notes}} type="checkbox">'
    + ' <label for="{{prefix}}teacher_note_checkbox" class="Ldt-EnrichedPlan-Control-Label Ldt-EnrichedPlan-Note-Teacher">Notes Enseignant</label>'
    + ' <input id="{{prefix}}other_note_checkbox" class="Ldt-EnrichedPlan-Control-Checkbox Ldt-EnrichedPlan-Note-Other" {{#show_other_notes}}checked{{/show_other_notes}} type="checkbox">'
    + ' <label for="{{prefix}}other_note_checkbox" class="Ldt-EnrichedPlan-Control-Label Ldt-EnrichedPlan-Note-Other">Notes Autres</label>'
    + ' <input id="{{prefix}}simplified_plan_checkbox" class="Ldt-EnrichedPlan-Control-Checkbox Ldt-EnrichedPlan-Note-Own" {{#show_own_notes}}checked{{/show_own_notes}} type="checkbox">'
    + ' <label for="{{prefix}}simplified_plan_checkbox" class="Ldt-EnrichedPlan-Control-Label Ldt-EnrichedPlan-Note-Own">Notes perso.</label>'
    + ' <input id="{{prefix}}slide_display_checkbox" class="Ldt-EnrichedPlan-Control-Checkbox Ldt-EnrichedPlan-Slide-Display" {{#show_slides}}checked{{/show_slides}} type="checkbox">'
    + ' <label for="{{prefix}}slide_display_checkbox" class="Ldt-EnrichedPlan-Control-Label Ldt-EnrichedPlan-Slide-Display">Diapo<br/>&nbsp;</label>'
    + '{{/show_controls}}'
    + ' <input class="Ldt-EnrichedPlan-Search-Input {{^show_controls}}Ldt-EnrichedPlan-Search-Input-Full{{/show_controls}}" type="search" incremental placeholder="Recherchez"/>'
    + ' </form>'
    + '<div class="Ldt-EnrichedPlan-Content"></div>'
    + '</div>';

IriSP.Widgets.EnrichedPlan.prototype.slideTemplate =
      '<div data-id="{{ id }}" class="Ldt-EnrichedPlan-Slide">'
    + '  <div class="Ldt-EnrichedPlan-SlideItem Ldt-EnrichedPlan-SlideTimecode">{{ begin }}</div>'
    + '  <div data-timecode="{{begintc}}" class="Ldt-EnrichedPlan-SlideItem {{^show_slides}}filtered_out{{/show_slides}} Ldt-EnrichedPlan-SlideThumbnail Ldt-EnrichedPlan-Slide-Display">{{#thumbnail}}<img title="{{ begin }} - {{ atitle }}" src="{{ thumbnail }}">{{/thumbnail}}</div>'
    + '  <div class="Ldt-EnrichedPlan-SlideContent">'
    + '     <div data-timecode="{{begintc}}" class="Ldt-EnrichedPlan-SlideTitle Ldt-EnrichedPlan-SlideTitle{{ level }}">{{ atitle }}</div>'
    + '     <div class="Ldt-EnrichedPlan-SlideNotes">{{{ notes }}}</div>'
    + '  </div>'
    + '</div>';

IriSP.Widgets.EnrichedPlan.prototype.annotationTemplate = '<div title="{{ begin }} - {{ atitle }}" data-id="{{ id }}" data-timecode="{{begintc}}" class="Ldt-EnrichedPlan-SlideItem Ldt-EnrichedPlan-Note {{category}} {{filtered}}"><span class="Ldt-EnrichedPlan-Note-Text">{{{ text }}}</span> <span class="Ldt-EnrichedPlan-Note-Author">{{ author }}</span> {{#can_edit}}<span class="Ldt-EnrichedPlan-EditControl"><span data-id="{{id}}" class="Ldt-EnrichedPlan-EditControl-Edit"></span><span data-id="{{id}}" class="Ldt-EnrichedPlan-EditControl-Delete"></span></span>{{/can_edit}}</div>';

IriSP.Widgets.EnrichedPlan.prototype.draw = function () {
    var _this = this;
    // Generate a unique prefix, so that ids of input fields
    // (necessary for label association) are unique too.
    _this.prefix = IriSP.generateUuid();
    // slides content: title, level (for toc)
    var _slides = this.getWidgetAnnotations().sortBy(function (_annotation) {
        return _annotation.begin;
    });
    if (_slides.length == 0) {
        // No valid segmentation defined. Let's pretend there is a
        // unique global segment.
        _slides = [ {
            id: "whole",
            title: "Whole video",
            begin: 0,
            end: _this.media.duration,
            thumbnail: ""
        } ];
    };
    // All other annotations
    var _annotations = this.media.getAnnotations().filter(function (a) {
        return a.getAnnotationType().title != _this.annotation_type;
    }).sortBy(function (_annotation) {
        return _annotation.begin;
    });

    // Reference annotations in each slide: assume that end time is
    // correctly set.
    _slides.forEach(function (slide) {
        slide.annotations = _annotations.filter(function (a) {
            return a.begin >= slide.begin && a.begin <= slide.end;
        });
    });

    _this.renderTemplate();
    var container = _this.$.find('.Ldt-EnrichedPlan-Container');
    var content = _this.$.find('.Ldt-EnrichedPlan-Content');

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
            atitle : IriSP.textFieldHtml(slide.title),
            level: slide.content ? (slide.content.level || 1) : 1,
            begin : slide.begin.toString(),
            begintc: slide.begin.milliseconds,
            thumbnail: slide.thumbnail,
            show_slides: _this.show_slides,
            notes: slide.annotations.map(function (a) {
                return Mustache.to_html(_this.annotationTemplate, {
                    id: a.id,
                    text: IriSP.textFieldHtml(a.description || a.title),
                    author: a.creator,
                    begin: a.begin.toString(),
                    begintc: a.begin.milliseconds,
                    atitle: a.title.slice(0, 20),
                    can_edit: a.meta['coco:can_edit'],
                    // FIXME: Temporary hack waiting for a proper metadata definition
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

    container.on("click", "[data-timecode]", function () {
        _this.media.setCurrentTime(Number(this.dataset.timecode));
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
};
