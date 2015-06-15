(function(window, $){
    var $doc = $(document);

    // Common functions
//    var oe = {
//        nextSwitch: function() {
//
//        },
//
//        nextActions
//    };
//
//    // Make it global
//    window.oe = oe;
})(window, jQuery);

$(function() {
    var screenHeight = $(window).outerHeight();
    $('.fitscreen').height(screenHeight);

    $('.btn-nav').click(function() {
        $(this).children('.lines-button').toggleClass('close');
        $('.site-nav-wrapper').toggleClass('active');
        $('.first-half-page').toggleClass('active');
    });
});
