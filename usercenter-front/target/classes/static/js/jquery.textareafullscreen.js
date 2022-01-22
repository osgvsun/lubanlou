/*

 jQuery Textarea Fullscreen Editor v1.0
 Fullscreen text editor plugin for jQuery.

 :For more details visit http://github.com/CreoArt/jquery.textareafullscreen

 - CreoArt <support@creoart.org>
 - http://github.com/CreoArt

 Licensed under Apache - https://raw.githubusercontent.com/CreoArt/jquery.textareafullscreen/master/LICENSE

*/
(function($) {
    "use strict";

    var isFullscreen = false,
        $el,
        $wrapper,
        $editor,
        $icon,
        $wrappers = [],
        $editors = [],
        $icons = [],
        $textIndex = 0,
        $els = [],
        $overlay,
        transitionDuration = 300,
        settings = {
            overlay: true,
            maxWidth: '',
            maxHeight: ''
        };
    var methods = {

        init: function(opts) {

            settings = settings || {};
            $.extend(true, settings, settings);
            $.extend(true, settings, opts);

            $el = $(this);
            if (!$el.is('textarea')) {
                $.error(
                    'Error initializing Textarea Fullscreen Editor Plugin. It can only work on <textarea> element.'
                );
                return;
            }
            var content =
                '<div class="tx-editor-wrapper"><div class="tx-editor"><a href="#" class="tx-icon"></a></div></div>';
            var $wrapper = $(content).insertAfter(this);
            $editor = $wrapper.find('.tx-editor');
            $icon = $editor.find('.tx-icon');
            $editor.append($el);
            $wrappers.push($wrapper);
            $editors.push($editor);
            $icons.push($icon);
            $els.push($el);

            $el.css({
                'width': '100%',
                'height': '100%',
				'resize': 'none'
            });

            // ESC = closes the fullscreen mode
            $(window).on("keyup.txeditor", function(e) {
                if (e.keyCode == 27) {
                    isFullscreen ? methods.minimize() : '';
                }
            });

            // fullscreen icon click event
            $el.prev().on('click.txeditor.icon', function(e) {
                        e.preventDefault();
                        // let that = $(this);
                $textIndex = $('.tx-icon').index(this)
                        methods[isFullscreen ? "minimize" : "expand"]();
            });
            // $icon.on('click.txeditor.icon', function(e) {
            //     e.preventDefault();
            //     methods[isFullscreen ? "minimize" : "expand"]();
            // });
            return this;
        },

        showOverlay: function() {
            $('<div class="tx-editor-overlay" />').appendTo('body')
                .fadeTo(0, 1)
                .click(function() {
                    methods.minimize();
                });
            return this;
        },

        removeOverlay: function() {
            var $overlay = $('.tx-editor-overlay');
            if ($overlay.length) {
                $overlay.fadeTo(0, 0, function() {
                    $(this).remove();
                });
            }
            return this;
        },

        expand: function() {
            settings.maxWidth ? $editors[$textIndex].css('max-width', settings.maxWidth) :
                '';
            settings.maxHeight ? $editors[$textIndex].css('max-height', settings.maxHeight) :
                '';
            $editors[$textIndex].css('border', '1px solid #e6e6e6')
            if (settings.overlay) {
                methods.showOverlay();
            }

            $(window).on('resize.txeditor', function() {
                relocate($editors[$textIndex]);
            });

            $editors[$textIndex].addClass('expanded');
            transitions();

            return this;
        },

        minimize: function() {

            $(window).off('resize.txeditor', relocate($editors[$textIndex]))
            $editors[$textIndex].removeClass('expanded')
                .css({
                    'max-width': 'none',
                    'max-height': 'none',
                    'border': 'none',
                });
            if (settings.overlay) {
                methods.removeOverlay();
            }
            transitions();

            return this;
        },

        destroy: function() {

            methods.removeOverlay();
            $wrappers[$textIndex].insertBefore($el);
            $wrappers[$textIndex].remove();

            $(window).off('keyup.txeditor')
                .off('resize.txeditor');

            return this;
        },
    };

    var transitions = function () {
			relocate($editors[$textIndex]);
            if (isFullscreen) {
				$el.focus();
				isFullscreen = false;
            } else {
				$el.focus();
				$editors[$textIndex].css('opacity', 1);
				isFullscreen = true;
            }

            return;
    };

    function relocate(el) {

        var yPos = 0 | ((($(window).height() - el.height()) / 2));
        var xPos = 0 | (($(window).width() - el.width()) / 2);
        el.css({
            'top': yPos,
            'left': xPos
        });

    }

    $.fn.textareafullscreen = function(method) {
        $.extend(methods, transitions);
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(
                arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method +
                ' does not exist on jQuery.textareafullscreen');
        }
    };

})(jQuery);
