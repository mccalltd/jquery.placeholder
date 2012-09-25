/*!
 * jquery.placeholder plugin
 * https://github.com/mccalltd/jquery.placeholder
 *
 * Copyright 2012 Tim McCall and all other contributors
 * Released under the MIT license
 */
 (function ($) {

	var nativeSupport = 'placeholder' in document.createElement('input');

	/***************************************************************
	 * Placeholder class definition
     ***************************************************************/

    var Placeholder = function (element, settings) {
        this._visible = false;
        this.settings = settings;
        this.element = element;
        this.$element = $(element);
        this.$overlabel = null;
        this.init();
    };

    Placeholder.prototype = {

		// Build an label to lay over the element; 
		// this label will provide mock placeholder functionality.
        _buildOverlabel: function () {
            var $element = this.$element,
				$overlabel = null,
                elementFloat = $element.css('float'),
				elementPosition = $element.css('position');

            $overlabel = this.$overlabel = $('<span>')
                .hide()
                .text($element.attr('placeholder'))
                .addClass(this.settings.overlabelClass)
                .css({
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
                $overlabel.css({
					'float': elementFloat,
					'position': 'static'
				});

			} else { // elementFloat === 'none'
                $overlabel.css({ 'position': 'absolute' });
				
				if (elementPosition === 'absolute') {
					$overlabel.css({
						top: $element.css('top'),
						left: $element.css('left'),
						'margin-left': 'auto'
					});
				}
			}
			
			$overlabel.insertAfter($element);
        },

		// For the given element and collection of property names, 
		// will sum the parsed float values of each css property on the element.
        _sumCssProperties: function ($element, cssProperties) {
            var sum = 0;
            $.each(cssProperties, function (index, property) {
                sum += parseFloat($element.css(property));
            });
            return sum + 'px';
        },

		// Sets focus on the element.
        focus: function () {
            this.$element.focus();
        },

		// Hides the placeholder.
        hide: function () {
            if (!this._visible) return;
            this.$overlabel.hide();
            this._visible = false;
        },

		// Initializes the placeholder functionality.
        init: function () {
            this._buildOverlabel();
            this.wireup();
            this.toggle();
        },

		// Shows the placeholder label.
        show: function () {
            if (this._visible) return; 
            this.$overlabel.show();
            this._visible = true;
        },

		// Toggles the visibility of the placeholder, 
		// depending on the current value of the element.
        toggle: function () {
            (this.element.value === '') ? this.show() : this.hide();
        },

		// Registers event handlers on the element and placeholder label.
        wireup: function () {
            this.$overlabel
                .on('click.placeholder', $.proxy(this.focus, this));

            this.$element
                .on('focusin.placeholder', $.proxy(this.hide, this))
                .on('focusout.placeholder', $.proxy(this.toggle, this));
        }
    };

    /***************************************************************
	 * Plugin definition
     ***************************************************************/
    
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