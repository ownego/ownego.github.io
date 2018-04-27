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

        var curScreen = parseInt($body.attr('data-active-screen'));

        switch(e.keyCode) {
          case 37: // Left
          case 38: // Up
            if(oe.switchCallback(curScreen, 'prev')) break;
            if(curScreen > 1) {
              oe.switchScreens(curScreen - 1);
            }
            break;

          case 39: // Right
          case 40: // Down
            if(oe.switchCallback(curScreen, 'next')) break;
            if(curScreen < config.screenCount) {
              oe.switchScreens(curScreen + 1);
            }
            break;
        }
      });
    },

    scrollActions: function() {
      // Scroll detection to change screen
      var lethargy = new Lethargy(20, 120, 0.3);
      var isSwitching = false;

      $(window).bind('mousewheel DOMMouseScroll wheel MozMousePixelScroll', function(e) {
        if($('body').hasClass('modal-open')) return;

        e.preventDefault();
        e.stopPropagation();

        var curScreen = parseInt($body.attr('data-active-screen'));

        if (!isSwitching) {
          isSwitching = true;

          if (lethargy.check(e) == 1) { // Scroll Up
            if(!oe.switchCallback(curScreen, 'prev')) {
              if(curScreen > 1) {
                oe.switchScreens(curScreen - 1);
              }
            }

          }
          else if (lethargy.check(e) == "-1") { // Scroll Down
            console.log(1)
            if(oe.switchCallback(curScreen, 'next')) {

            } else {
              if(curScreen < config.screenCount) {
                oe.switchScreens(curScreen + 1);
              }
            }
          }

          setTimeout(function () {
            isSwitching = false;
          }, 2000);
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

      ga('send','event', {
        eventCategory: 'layout',
        eventAction: 'Switch to screen' + targetScreen,
        eventLabel: 'Switch to screen' + targetScreen
      });
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

  // functions call
  oe.loader.init();

  // Some elements must fit the screen height
  //  so I create a specific class for all of 'em
  var screenHeight = $(window).outerHeight();
  var screenWidth = $(window).outerWidth();
  $('.fitscreen').height(screenHeight);

  oe.punchs.init();
  oe.switchActions();
  if(screenWidth > 1023) {
    oe.scrollActions();
  }
  oe.eventTracking.init();
  oe.imgLazy.init();
});
