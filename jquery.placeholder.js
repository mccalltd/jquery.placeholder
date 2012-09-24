(function ($) {

    // Placeholder class definition
    //-------------------------------------------------------

    var Placeholder = function (element, settings) {
        this.settings = settings;
        this.element = element;
        this.$element = $(element);
        this.$overlabel = null;
        this.init();
    };

    Placeholder.prototype = {

        _buildOverlabel: function () {
            var $element = this.$element,
                placeholder = $element.attr('placeholder'),
                elementInnerHeight = $element.height(),
                elementWidth = $element.outerWidth(),
                elementInnerWidth = $element.width(),
                elementPaddingTop = parseFloat($element.css('padding-top')),
                elementPaddingBottom = parseFloat($element.css('padding-top')),
                elementPaddingLeft = parseFloat($element.css('padding-left')),
                elementBorderTopWidth = parseFloat($element.css('border-top-width')),
                elementBorderBottomWidth = parseFloat($element.css('border-top-width')),
                elementBorderLeftWidth = parseFloat($element.css('border-left-width')),
                elementFloat = $element.css('float'),
                elementPosition = elementFloat === 'none' ? 'absolute' : 'static',
                labelMaxWidth = elementInnerWidth,
                labelMaxHeight = elementInnerHeight + elementPaddingBottom - elementBorderBottomWidth,
                labelPaddingTop = elementPaddingTop + elementBorderTopWidth,
                labelPaddingLeft = elementPaddingLeft + elementBorderLeftWidth,
                labelLineHeight = $element.css('line-height');

            this.$overlabel = $('<span>')
                .hide()
                .text(placeholder)
                .addClass(this.settings.overlabelClass)
                .css({
                    position: elementPosition,
                    'float': elementFloat,
                    'max-width': labelMaxWidth,
                    'max-height': labelMaxHeight,
                    'overflow': 'hidden',
                    'padding-top': labelPaddingTop + 'px',
                    'padding-left': labelPaddingLeft + 'px',
                    'margin-left': -1 * elementWidth + 'px',
                    'line-height': labelLineHeight
                })
                .insertAfter($element);
        },

        focus: function () {
            this.$element.focus();
        },

        hide: function () {
            this.$overlabel.hide();
        },

        init: function () {
            this._buildOverlabel();
            this.wireup();
            this.reset();
        },

        reset: function () {
            if (this.element.value === '')
                this.$overlabel.show();
        },

        wireup: function () {
            this.$overlabel
                .on('click.placeholder', $.proxy(this.focus, this));

            this.$element
                .on('focusin.placeholder', $.proxy(this.hide, this))
                .on('focusout.placeholder', $.proxy(this.reset, this));
        }
    };

    // Plugin
    //-------------------------------------------------------

    $.fn.placeholder = 'placeholder' in document.createElement('input')
        ? $.noop
        : function (option) {
            // Filter by elements with placeholder attributes.
            return this.filter('[placeholder]').each(function () {

                var $this = $(this),
                    data = $this.data('placeholder'),
                    options = $.extend({}, $.fn.placeholder.defaults, typeof option === 'object' ? option : {});

                // Initialize only once.
                if (!data) $this.data('placeholder', (data = new Placeholder(this, options)));

                // Call method on placeholder object attached to this element.
                if (typeof option === 'string') data[option]();

            }).end(); // Remove filter so chaining works for the caller.
        };

    $.fn.placeholder.defaults = {
        overlabelClass: 'placeholder'
    };

} (jQuery));
