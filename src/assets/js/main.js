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

        effLogoName: function() {
            $('.texttl').textillate({
                initialDelay: 500
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
        var firstScreen = 1;
        $('body').attr('data-active-screen', firstScreen);
        $('[data-screen-no=' + firstScreen + ']').addClass('active');
    }, 500);

    oe.nextSwitch();
    oe.effLogoName();

    // Logo drawing via SVG
    var current_frame = 0;
    var total_frames = 120;
    var path = new Array();
    var length = new Array();
    for(var i = 0; i < 3; i++){
        path[i] = document.getElementById('i'+i);
        l = path[i].getTotalLength();
        length[i] = l;
        path[i].style.strokeDasharray = l + ' ' + l;
        path[i].style.strokeDashoffset = l;
    }
    var handle = 0;

    var draw = function() {
        var progress = current_frame/total_frames;
        if (progress > 1) {
            window.cancelAnimationFrame(handle);
        } else {
            current_frame++;
            for(var j=0; j<path.length;j++){
                path[j].style.strokeDashoffset = Math.floor(length[j] * (1 - progress));
            }
            handle = window.requestAnimationFrame(draw);
        }
    };
    draw();
});
