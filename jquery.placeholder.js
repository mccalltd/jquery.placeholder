(function ($) {
    var nativeSupport = 'placeholder' in document.createElement('input'),
        defaults = {
            labelClass: 'placeholder'
        };

    $.fn.placeholder = nativeSupport ? $.noop : function (options) {

        var settings = $.extend(defaults, options),
            initializedDataKey = 'placeholder.initialized';

        return this.filter('[placeholder]').each(function () {

            // Only initialize once!
            if ($(this).data(initializedDataKey) === true)
                return;

            var $input = $(this),
                placeholder = $input.attr('placeholder'),
                $overlabel = $('<span>'),
            // Vertical positioning
                inputPaddingTop = parseFloat($input.css('padding-top')),
                inputBorderTopWidth = parseFloat($input.css('border-top-width')),
                labelPaddingTop = inputPaddingTop + inputBorderTopWidth,
            // Horizontal positioning
                inputWidth = $input.outerWidth(),
                inputPaddingLeft = parseFloat($input.css('padding-left')),
                inputBorderLeftWidth = parseFloat($input.css('border-left-width')),
                labelPaddingLeft = inputPaddingLeft + inputBorderLeftWidth,
            // Other overlabel properties
                inputFloat = $input.css('float'),
                inputPosition = inputFloat === 'none' ? 'absolute' : 'static',
                labelLineHeight = $input.css('line-height');

            // Place a label over the input.
            $overlabel
                .text(placeholder)
                .hide()
                .addClass(settings.labelClass)
                .css({
                    position: inputPosition,
                    'float': inputFloat,
                    'padding-top': labelPaddingTop + 'px',
                    'padding-left': labelPaddingLeft + 'px',
                    'margin-left': -1 * inputWidth + 'px',
                    'line-height': labelLineHeight
                })
                .insertAfter($input)
                .on('click.placeholder', function () {
                    $input.focus();
                });

            // Mark the input as initialized
            $input.data(initializedDataKey, true);

            // Toggle the placeholder visibility as the associated input is manipulated
            $input
                .on('focusin.placeholder', function () {
                    $overlabel.hide();
                })
                .on('focusout.placeholder', function () {
                    (this.value === '') ? $overlabel.show() : $.noop();
                });

            // Initialize the placeholders
            $input.trigger('focusout.placeholder');

        }).end(); // Stop filtering on [placeholder] so chaining works as expected by caller.

    };
} (jQuery));
