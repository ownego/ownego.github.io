(function(window, $){
    var $doc = $(document);
    var $body = $('body');

    // Common functions
    var oe = {
        nextSwitch: function() {
            var screenCount = $('.main-screen').size();
            $doc.on('click', '#nextBtn', function() {
                var currentScreen = parseInt($body.attr('data-active-screen'));
                var nextScreen = (currentScreen == screenCount) ? 1 : (currentScreen + 1);

                $body.attr('data-active-screen', nextScreen);
                $('[data-screen-no=' + currentScreen + ']').removeClass('active');
                $('[data-screen-no=' + nextScreen + ']').addClass('active');
            });
        },

        nextActions: function() {

        }
    };

    // Make it global
    window.oe = oe;
})(window, jQuery);

$(function() {
    var screenHeight = $(window).outerHeight();
    $('.fitscreen').height(screenHeight);

    $('.btn-nav').click(function() {
        $(this).children('.lines-button').toggleClass('close');
        $('.site-nav-wrapper').toggleClass('active');
        $('.first-half-page').toggleClass('active');
    });

    oe.nextSwitch();
});
