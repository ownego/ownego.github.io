(function(window, $){
    var $doc = $(document);
    var $body = $('body');

    var config = {
        firstScreen: 1,
        screenCount: $('.main-screen').size()
    }

    // Common functions
    var oe = {
        switchActions: function() {
            $doc.on('click', '.nav-items', function(e) {
                oe.switchScreens($(this).attr('data-screen-go'));
            });
        },

        switchScreens: function(targetScreen) {
            $body.attr('data-active-screen', targetScreen);
            $('.main-screen.active').removeClass('active');
            $('.main-screen[data-screen-no=' + targetScreen + ']').addClass('active');

            // Draw a SVG per page
            if(targetScreen == 1) {
                oe.drawingShapes('#oeLogo');
                oe.effLogoName();
            } else if(targetScreen == 2) {
                setTimeout(function() {
                    oe.drawingShapes('#foundersSign');
                }, 1000);
            }

            // Special chain
            var $rect = $('.rectangle');
            if(targetScreen == 3) {
                setTimeout(function() {
                    $rect.addClass('eff-chain');
                }, 800);
            } else {
                $rect.removeClass('eff-chain');
            }
        },

        effLogoName: function() {
            $('.texttl').textillate({
                initialDelay: 500
            });
        },

        drawingShapes: function(selector, options) {
            var svgs = Array.prototype.slice.call($(selector)),
                svgArr = new Array();

            svgs.forEach(function(el, i) {
                var svg = new SVGEl(el, options);
                svgArr[i] = svg;
                setTimeout(function(el) {
                    return function() {
                        svg.render();
                    };
                }(el), 1000);
            });
        }
    };

    // Make it global
    window.oe = oe;
})(window, jQuery);

$(function() {
    // Some elements must fit the screen height
    //  so I create a specific class for all of 'em
    var screenHeight = $(window).outerHeight();
    $('.fitscreen').height(screenHeight);

    // Navigation button
    $('.btn-nav').click(function(e) {
        e.stopPropagation();
        $('.lines-button').toggleClass('close');
        $('.site-nav-wrapper, .first-half-page').toggleClass('active');
    });

    $('body, html').click(function() {
        $navBtn = $('.lines-button');
        if($navBtn.hasClass('close')) {
            $navBtn.removeClass('close');
            $('.site-nav-wrapper, .first-half-page').removeClass('active');
        }
    });

    $('[data-toggle="tooltip"]').tooltip();

    // functions call
    oe.switchActions();
});
