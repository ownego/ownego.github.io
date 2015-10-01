(function(window, $) {
  var $doc = $(document);
  var $body = $('body');
  var $grand = $('body, html');

  var config = {
    firstScreen: 1,
    screenCount: $('.main-screen').size()
  }

  // Common functions
  var oe = {
    switchActions: function() {
      $doc.on('click', '[data-screen-go]', function(e) {
        e.preventDefault();
        oe.switchScreens($(this).attr('data-screen-go'));
      });

      $doc.on('keyup', function(e) {
        if($('body').hasClass('modal-open')) return;
        switch(e.keyCode) {
          case 37: // Left
          case 38: // Up
            var curScreen = parseInt($body.attr('data-active-screen'));
            if(curScreen > 1)
              oe.switchScreens(curScreen - 1);
            break;

          case 39: // Right
          case 40: // Down
            var curScreen = parseInt($body.attr('data-active-screen'));
            if(curScreen < config.screenCount)
              oe.switchScreens(curScreen + 1);
            break;
        }
      });
    },

    switchScreens: function(targetScreen) {
      // Give hash to the url
      this.hashTracker(targetScreen);

      // Setting up the screen active
      $body.attr('data-active-screen', targetScreen);
      $('.main-screen.active').removeClass('active');
      $('.main-screen[data-screen-no=' + targetScreen + ']').addClass('active');
      setTimeout(function() {
        $grand.scrollTop(0);
      }, 200);

      // Draw a SVG per page
      if (targetScreen == 1) {
        // Logo draw effect
        $('#oeLogo').oeSvgDrawing({
          colorCurrent: [255, 255, 255]
        });

        // Logo name effect
        $('.texttl').textillate({
          initialDelay: 500
        });
      } else if (targetScreen == 2) {
        // Founders signature effect
        setTimeout(function() {
          $('#foundersSign').oeSvgDrawing({
            framesTotal: 150,
            colorCurrent: [51, 51, 51],
            colorTarget: [255, 255, 255],
            colorStroke: [255, 255, 255]
          });
        }, 1000);
      }

      // Special chain
      var $rect = $('.rectangle');
      if (targetScreen == 3) {
        setTimeout(function() {
          $rect.addClass('eff-chain');
        }, 800);
      } else {
        $rect.removeClass('eff-chain');
      }
    },

    hashUrl: function() {
      // Quick link to screen via hash on url
      var hash = window.location.hash.replace('#', '');
      var screenNo = 1;
      if(hash) {
        screenNo = $('[data-screen-hash='+ hash +']').attr('data-screen-no');
      }
      this.switchScreens(screenNo);
    },

    hashTracker: function(screenNo) {
      // provide the hash to url via screen number
      var screenHash = $('[data-screen-no=' + screenNo + ']').attr('data-screen-hash');
      window.location.hash = '#' + screenHash;
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
    if ($navBtn.hasClass('close')) {
      $navBtn.removeClass('close');
      $('.site-nav-wrapper, .first-half-page').removeClass('active');
    }
  });

  $('[data-toggle="tooltip"]').tooltip();
  $('.scrollable').mCustomScrollbar({
    theme: 'rounded-dark',
    mouseWheel: {
      enable: true,
      scrollAmount: 2000
    }
  });

  // functions call
  oe.switchActions();
  oe.loader.init();
});
