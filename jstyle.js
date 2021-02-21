var $ = (function () {
    'use strict';
    var Constructor = function (selector) {
        if (selector === 'document') {
            this.elems = [document];
        } else if (selector === 'window') {
            this.elems = [window];
        } else {
            this.elems = document.querySelectorAll(selector);
        }
    };

    var bStyleArray = ["padding", "paddingLeft", "paddingRight", "paddingTop", "paddingBottom",
        "margin", "marginLeft", "marginRight", "marginTop", "marginBottom", "border", "borderRadius"
        , "borderLeft", "borderRight", "borderTop", "borderBottom", "borderTopLeftRadius", "borderTopRightRadius",
        "borderBottomLeftRadius", "borderBottomRightRadius", "fontSize", "fontWeight", "color", "background",
        "backgroundColor", "backgroundImage", "backgroundSize", "backgroundRepeat", "backgroundPosition",
        "backgroundBlendMode", "backgroundClip", "backgroundAttachment", "backgroundOrigin", "backgroundPositionX",
        "backgroundPositionY", "backgroundRepeatX", "backgroundRepeatY", "fontStyle", "fontVariant", "display", "textAlign", "overflow",
        "overflowX", "overflowY", "textOverflow", "overflowWrap", "whiteSpace", "textOrientation", "textDecoration",
        "objectFit", "objectPosition", "zIndex", "font", "fontFamily", "justifyContent", "aligniItems", "flex", "flexBasis",
        "flexWrap", "flexDirection", "flexGrow", "flexFlow", "flexShrink", "justifyItems", "justifyContent", "alignSelf",
        "alignContent", "verticalAlign", "cursor", "visibility", "opacity", "animation", "animationDelay", "animationTimingFunction", "animationDuration", "animationDirection", "animationFillMode", "animationName", "animationIterationCount", "animationPlayState",
        "transition", "transitionDelay", "transitionDuration", "transitionProperty", "transitionTimingFunction", "textIndent", "textOrientation", "textRendering", "wordBreak", "wordSpacing", "float", "appearance", "backdropFilter", "backfaceVisibility",
        "boxShadow", "boxSizing", "bottom", "left", "right", "top", "position", "transform", "caretColor", "clip", "clipPath", "column", "columnCount", "columnGap", "columnRule", "columnFill", "columnRuleColor", "columnRuleStyle", "columnRuleWidth", "columnSpan", "columnWidth", "columns", "content",
        "contentVisibility", "counterIncrement", "counterReset", "counterSet", "direction", "emptyCells", "filter", "letterSpacing", "gap", "width", "height", "minWidth", "minHeight", "maxWidth", "maxHeight"
        , "imageOrientation", "imageRendering", "lineHeight", "lineBreak", "listStye", "offset", "order", "outline", "outlineColor", "outlineOffset", "outlineWidth", "outlineStyle", "pointerEvents", "perspective", "perspectiveOrigin", "resize", "rowGap", "transformStyle", "transformOrigin", "transformBox", "userSelect", "zoom"
    ]

    function bStyle() {
        bStyleArray.forEach(v => {
            Constructor.prototype[v] = function (str) {
                this.elems.forEach(el => {
                    el.style[v] = str
                })
                return this
            }
        })
    }

    bStyle()

    Constructor.prototype.each = function (callback) {
        if (!callback || typeof callback !== 'function') return;
        for (var i = 0; i < this.elems.length; i++) {
            callback(this.elems[i], i, this.elems);
        }
    };

    var instantiate = function (selector) {
        return new Constructor(selector);
    };

    return instantiate;

})();
