IriSP.Widgets.Tagcloud = function(player, config) {
    IriSP.Widgets.Widget.call(this, player, config);
    this.stopwords = IriSP._.uniq([].concat(this.custom_stopwords).concat(this.stopword_lists[this.stopword_language]));
}

IriSP.Widgets.Tagcloud.prototype = new IriSP.Widgets.Widget();

IriSP.Widgets.Tagcloud.prototype.template =
    '<div class="Ldt-Tagcloud-Container"><ul class="Ldt-Tagcloud-List">'
    + '{{#words}}<li class="Ldt-Tagcloud-item Ldt-TraceMe" trace-info="tag:{{word}}" content="{{word}}" style="font-size: {{size}}px">{{word}}</li>{{/words}}'
    + '</ul></div>';

IriSP.Widgets.Tagcloud.prototype.defaults = {
    include_titles: true,
    include_descriptions: true,
    include_tag_texts: true,
    tag_count: 30,
    stopword_language: "fr",
    custom_stopwords: [],
    exclude_pattern: false,
    annotation_type: false,
    segment_annotation_type: false,
    min_font_size: 10,
    max_font_size: 26
}

IriSP.Widgets.Tagcloud.prototype.stopword_lists = {
    "fr" : [
        'aussi', 'avec', 'aux', 'bien', 'car', 'cette', 'comme', 'dans', 'des', 'donc', 'dont', 'elle', 'encore', 'entre', 'est',
        'être', 'eux', 'faire', 'fait', 'http', 'ici', 'ils', 'les', 'leur', 'leurs', 'mais', 'mes', 'même', 'mon', 'notre',
        'non', 'nos', 'nous', 'ont', 'par', 'pas', 'peu', 'peut', 'plus', 'pour', 'quand', 'que', 'qui', 'quoi', 'sans',
        'ses' ,'son', 'sont', 'sur', 'tes', 'très', 'the', 'ton', 'tous', 'tout', 'une', 'votre', 'vos', 'vous'
    ],
    "en" : [
        'about', 'again', 'are', 'and', 'because', 'being', 'but', 'can', 'done', 'have', 'for', 'from',
        'get', 'here', 'http', 'like', 'more', 'one', 'our', 'she', 'that', 'the', 'their', 'then', 'there',
        'they', 'this', 'very', 'what', 'when', 'where', 'who', 'why', 'will', 'with', 'www', 'you', 'your'
    ]
}

IriSP.Widgets.Tagcloud.prototype.draw = function() {
    this.onMdpEvent("search", "onSearch");
    this.onMdpEvent("search.closed", "onSearch");
    this.onMdpEvent("search.cleared", "onSearch");
    
    if (this.segment_annotation_type) {
        var _this = this;
        this.source.getAnnotationsByTypeTitle(this.segment_annotation_type).forEach(function(_a) {
            _a.on("enter", function() {
                _this.redraw(_a.begin, _a.end);
            })
        });
    } else {
        this.redraw();
    }
}

IriSP.Widgets.Tagcloud.prototype.redraw = function(_from, _to) {
    var _urlRegExp = /https?:\/\/[0-9a-zA-Z\.%\/-_]+/g,
        _regexpword = /[^\s\.&;,'"!\?\d\(\)\+\[\]\\\…\-«»:\/]{3,}/g,
        _words = {},
        _this = this,
        _annotations = this.getWidgetAnnotations();
        
    if (typeof _from !== "undefined" && typeof _to !== "undefined") {
        _annotations = _annotations.filter(function(_annotation) {
            return _annotation.begin >= _from && _annotation.end <= _to;
        })
    }
    
    _annotations.forEach(function(_annotation) {
       var _txt =
            (_this.include_titles ? _annotation.title : '')
            + ' '
            + (_this.include_descriptions ? _annotation.description : '')
            + ' '
            + (_this.include_tag_texts ? _annotation.getTagTexts() : '');
       IriSP._(_txt.toLowerCase().replace(_urlRegExp, '').match(_regexpword)).each(function(_word) {
           if (IriSP._(_this.stopwords).indexOf(_word) == -1 && (!_this.exclude_pattern || !_this.exclude_pattern.test(_word))) {
               _words[_word] = 1 + (_words[_word] || 0);
           }
       })
    });
    _words = IriSP._(_words)
        .chain()
        .map(function(_v, _k) {
            return {
                "word" : _k,
                "count" : _v
            }
        })
        .filter(function(_v) {
            return _v.count > 2;
        })
        .sortBy(function(_v) {
            return - _v.count;
        })
        .first(this.tag_count)
        .value();
    if (_words.length) {
        var _max = _words[0].count,
            _min = Math.min(_words[_words.length - 1].count, _max - 1),
            _scale = (this.max_font_size - this.min_font_size) / Math.sqrt(_max - _min);
        IriSP._(_words).each(function(_word) {
                _word.size = Math.floor( _this.min_font_size + _scale * Math.sqrt(_word.count - _min) );
            });
    }
    this.$.html(Mustache.to_html(this.template,  {words: _words }));
    this.$.find(".Ldt-Tagcloud-item").click(function() {
        var _txt = IriSP.jQuery(this).attr("content");
        _this.player.trigger("search.triggeredSearch", _txt);
    });
    
}

IriSP.Widgets.Tagcloud.prototype.onSearch = function(searchString) {
    searchString = typeof searchString !== "undefined" ? searchString : '';
    if (searchString) {
        var _rgxp = IriSP.Model.regexpFromTextOrArray(searchString);
    }
    this.$.find(".Ldt-Tagcloud-item").each(function() {
        var _el = IriSP.jQuery(this),
            _txt = _el.attr("content");
        if (searchString) {
            _el.html(_txt.replace(_rgxp, '<span class="Ldt-Tagcloud-active">$1</span>'));
        } else {
            _el.html(_txt);
        }
    });
}