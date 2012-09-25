(function ($) {

	var nativeSupport = 'placeholder' in document.createElement('input');

    // Placeholder class definition
    //-------------------------------------------------------

    var Placeholder = function (element, settings) {
        this._visible = false;
        this.settings = settings;
        this.element = element;
        this.$element = $(element);
        this.$overlabel = null;
        this.init();
    };

    Placeholder.prototype = {

        _buildOverlabel: function () {
            var $element = this.$element,
				$overlabel = null,
                elementFloat = $element.css('float'),
				elementPosition = $element.css('position'),
                labelPosition;

			// Build the label.
            $overlabel = this.$overlabel = $('<span>')
                .hide()
                .text($element.attr('placeholder'))
                .addClass(this.settings.overlabelClass)
                .css({
                    position: labelPosition,
                    'float': elementFloat,
                    'max-width': $element.width(),
                    'max-height': $element.height(),
                    'overflow': 'hidden',
                    'padding-top': this._sumCssProperties($element, ['padding-top', 'border-top-width']),
                    'padding-left': this._sumCssProperties($element, ['padding-left', 'border-left-width']),
                    'margin-left': -1 * $element.outerWidth() + 'px',
                    'font-size': $element.css('font-size'),
                    'font-family': $element.css('font-family'),
                    'line-height': $element.css('line-height')
                });
				
			if (elementFloat !== 'none') {
				// Position label with floated element.
                $overlabel.css({
					'float': elementFloat,
					'position': 'static'
				});
			} else {
				// Position label with non-floated element.
                $overlabel.css({ 'position': 'absolute' });
				
				// Position label with absolutely positioned element.
				if (elementPosition === 'absolute') {
					$overlabel.css({
						top: $element.css('top'),
						left: $element.css('left'),
						'margin-left': 'auto'
					});
				}
			}
			
			// Add the label to the DOM.
			$overlabel.insertAfter($element);
        },

        _sumCssProperties: function ($element, cssProperties) {
            var sum = 0;
            $.each(cssProperties, function (index, property) {
                sum += parseFloat($element.css(property));
            });
            return sum + 'px';
        },

        focus: function () {
            this.$element.focus();
        },

        hide: function () {
            if (!this._visible) return;
            this.$overlabel.hide();
            this._visible = false;
        },

        init: function () {
            this._buildOverlabel();
            this.wireup();
            this.toggle();
        },

        show: function () {
            if (this._visible) return; 
            this.$overlabel.show();
            this._visible = true;
        },

        toggle: function () {
            (this.element.value === '') ? this.show() : this.hide();
        },

        wireup: function () {
            this.$overlabel
                .on('click.placeholder', $.proxy(this.focus, this));

            this.$element
                .on('focusin.placeholder', $.proxy(this.hide, this))
                .on('focusout.placeholder', $.proxy(this.toggle, this));
        }
    };

    // Plugin
    //-------------------------------------------------------
    
	$.fn.placeholder = nativeSupport ? $.noop : function (option) {
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

	$.fn.placeholder.nativeSupport = nativeSupport;
	
    $.fn.placeholder.defaults = {
        overlabelClass: 'placeholder'
    };

} (jQuery));