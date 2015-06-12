(function(window, $){
    var $doc = $(document);

    // Common functions
    var oe = {
    };

    // Make it global
    window.oe = oe;
})(window, jQuery);

$(function() {
    var screenHeight = $(window).outerHeight();
    $('.fitscreen').height(screenHeight);
});

$('.lines-button').click(function() {
  $(this).toggleClass( "close" );
});