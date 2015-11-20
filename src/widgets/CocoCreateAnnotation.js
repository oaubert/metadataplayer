IriSP.Widgets.CocoCreateAnnotation = function (player, config) {
    IriSP.Widgets.Widget.call(this, player, config);
};

IriSP.Widgets.CocoCreateAnnotation.prototype = new IriSP.Widgets.Widget();

IriSP.Widgets.CocoCreateAnnotation.prototype.defaults = {
    pause_on_write : true
};

IriSP.Widgets.CocoCreateAnnotation.prototype.messages = {
    en: {
        type_description: "Enter a new note..."
    },
    fr: {
        type_description: "Prenez vos notes..."
    }
};

IriSP.Widgets.CocoCreateAnnotation.prototype.template =
    '<form class="Ldt-CocoCreateAnnotation-Form">' +
    '  <input class="Ldt-CocoCreateAnnotation-Timecode" type="text" value="??:??">' +
    '  <textarea class="Ldt-CocoCreateAnnotation-Text" autofocus placeholder="??:?? {{ l10n.type_description }}"></textarea>' +
    '</form>';

IriSP.Widgets.CocoCreateAnnotation.prototype.draw = function () {
    var _this = this;
    var timecodeField,
        textField;

    this.previousInput = "";
    this.renderTemplate();

    timecodeField = this.$.find(".Ldt-CocoCreateAnnotation-Timecode");
    textField = this.$.find(".Ldt-CocoCreateAnnotation-Text");

    this.begin = new IriSP.Model.Time();
    textField.on("change keyup input paste", this.functionWrapper("onTextChange"));
    this.$.find("form").submit(this.functionWrapper("onSubmit"));

    this.onMediaEvent("timeupdate", function (_time) {
        // Update timecode if description is empty
        if (textField.val().trim() == "") {
            _this.setBegin(_time);
        };
    });
};

IriSP.Widgets.CocoCreateAnnotation.prototype.setBegin = function (t) {
    this.begin = new IriSP.Model.Time(t || 0);
    this.$.find(".Ldt-CocoCreateAnnotation-Timecode").val(this.begin.toString());
};

IriSP.Widgets.CocoCreateAnnotation.prototype.pauseOnWrite = function () {
    if (this.pause_on_write && !this.media.getPaused()) {
        this.media.pause();
    }
};

IriSP.Widgets.CocoCreateAnnotation.prototype.onTextChange = function (e) {
    if (e !== undefined && e.keyCode == 13 && !e.shiftKey) {
        // Return: submit. Use shift-Return to insert a LF
        this.onSubmit();
        return true;
    }
    var _field = this.$.find(".Ldt-CocoCreateAnnotation-Text"),
        _timecodeField = this.$.find(".Ldt-CocoCreateAnnotation-Timecode"),
        _contents = _field.val();
    _field.css("border-color", !!_contents ? "#666666" : "#ff0000");
    if (!!_contents) {
        if (!this.previousInput) {
            // Inputing text from an empty field, initialize timecode
            this.setBegin(this.media.getCurrentTime());
        }
        _field.removeClass("empty");
        _timecodeField.addClass("Ldt-CocoCreateAnnotation-Timecode-Active");
    } else {
        _field.addClass("empty");
        _timecodeField.removeClass("Ldt-CocoCreateAnnotation-Timecode-Active");
    }
    this.pauseOnWrite();
    this.previousInput = _contents;
    return !!_contents;
};

IriSP.Widgets.CocoCreateAnnotation.prototype.onSubmit = function () {
    var _this = this,
        _exportedAnnotations = new IriSP.Model.List(this.player.sourceManager), /* We create a List to send to the server that will contains the annotation */
        _export = this.player.sourceManager.newLocalSource({serializer: IriSP.serializers[this.api_serializer]}), /* We create a source object using a specific serializer for export */
        _annotation = new IriSP.Model.Annotation(false, _export), /* We create an annotation in the source with a generated ID (param. false) */
        _annotationTypes = this.source.getAnnotationTypes().searchByTitle(this.annotation_type, true), /* We get the AnnotationType in which the annotation will be added */
        _annotationType = (_annotationTypes.length ? _annotationTypes[0] : new IriSP.Model.AnnotationType(false, _export)), /* If it doesn't already exists, we create it */
        _url = Mustache.to_html(this.api_endpoint_template, {id: this.source.projectId}); /* We make the url to send the request to, must include project id */

    /* If we created an AnnotationType on the spot ... */
    if (!_annotationTypes.length) {
        /* ... We must not send its id to the server ... */
        _annotationType.dont_send_id = true;
        /* ... And we must include its title. */
        _annotationType.title = this.annotation_type;
    }

    /*
     * Will fill the generated annotation object's data
     * WARNING: If we're on a MASHUP, these datas must refer the ORIGINAL MEDIA
     * */
    _annotation.setMedia(this.source.currentMedia.id); /* Annotated media ID */

    _annotation.setBeginEnd(this.begin, this.begin);
    _annotation.setAnnotationType(_annotationType.id); /* Annotation type ID */

    _annotation.created = new Date(); /* Annotation creation date */
    _annotation.description = this.$.find(".Ldt-CocoCreateAnnotation-Text").val().trim();
    _annotation.title = "";

    if (this.project_id != "") {
        /* Project id, only if it's been specifiec in the config */
        _annotation.project_id = this.project_id;
    }

    _annotation.creator = this.creator_name;
    _exportedAnnotations.push(_annotation); /* Ajout de l'annotation à la liste à exporter */

    if (_url !== "") {
        _exportedAnnotations.push(_annotation); /* We add the annotation in the list to export */
        _export.addList("annotation", _exportedAnnotations); /* We add the list to the source object */
        /* We send the AJAX request to the server ! */
        IriSP.jQuery.ajax({
            url: _url,
            type: this.api_method,
            contentType: 'application/json',
            data: _export.serialize(), /* Source is serialized */
            success: function (_data) {
                _this.showScreen('Saved');
                if (_this.after_send_timeout) {
                    window.setTimeout(
                        function () {
                            _this.close_after_send
                                ? _this.player.trigger("CocoCreateAnnotation.hide")
                                : _this.player.trigger("CocoCreateAnnotation.show");
                        },
                        _this.after_send_timeout
                    );
                }
                _export.getAnnotations().removeElement(_annotation, true); /* We delete the sent annotation to avoid redundancy */
                _export.deSerialize(_data); /* Data deserialization */
                _this.source.merge(_export); /* We merge the deserialized data with the current source data */
                if (_this.pause_on_write && _this.media.getPaused()) {
                    _this.media.play();
                }
                _this.player.trigger("AnnotationsList.refresh");
            },
            error: function (_xhr, _error, _thrown) {
                IriSP.log("Error when sending annotation", _thrown);
                _export.getAnnotations().removeElement(_annotation, true);
                _this.showScreen('Error');
                window.setTimeout(function () {
                    _this.showScreen("Main");
                },
                                  (_this.after_send_timeout || 5000));
            }
        });
        this.showScreen('Wait');
    };
    return false;
};