(function(window, $){
    var $doc = $(document);
    var $body = $('body');

    var config = {
        firstScreen: 1,
        screenCount: $('.main-screen').size()
    }

    // Common functions
    var oe = {
        switchNext: function() {
            // Get current screen
            //      if the first time, start from first screen (at config)
            var currentScreen = $body.attr('data-active-screen') ? parseInt($body.attr('data-active-screen')) : (config.firstScreen - 1);
            var nextScreen = (currentScreen == config.screenCount) ? 1 : (currentScreen + 1);

            $body.attr('data-active-screen', nextScreen);
            $('[data-screen-no=' + currentScreen + ']').removeClass('active');
            $('[data-screen-no=' + nextScreen + ']').addClass('active');

            if(nextScreen == 1) {
                oe.drawingShapes('#oeLogo');
            } else if(nextScreen == 2) {
                oe.drawingShapes('#foundersSign');
            }
        },

        switchActions: function() {
            $doc.on('click', '#nextBtn', function() {
                oe.switchNext();
            });
        },

        effLogoName: function() {
            $('.texttl').textillate({
                initialDelay: 500
            });
        },

        drawingShapes: function(selector) {
            var svgs = Array.prototype.slice.call($(selector)),
                svgArr = new Array();

            svgs.forEach(function(el, i) {
                var svg = new SVGEl(el);
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
    $('.btn-nav').click(function() {
        $(this).children('.lines-button').toggleClass('close');
        $('.site-nav-wrapper, .first-half-page').toggleClass('active');
    });

    // Delay to show the effects
    setTimeout(function() {
        oe.switchNext();
    }, 500);

    oe.switchActions();
    oe.effLogoName();
});
