(function (window, $) {
  var $doc = $(document);
  var $body = $('body');

  var config = {
    firstScreen: 1,
    screenCount: $('.main-screen').size()
  }

  // Common functions
  var oe = {
    switchActions: function () {
      $doc.on('click', '.nav-items', function(e) {
        oe.switchScreens($(this).attr('data-screen-go'));
      });

      $doc.on('keyup', function(e) {
        if($('body').hasClass('modal-open')) return;

        switch(e.keyCode) {
          case 38: // Up
            var curScreen = parseInt($body.attr('data-active-screen'));
            if(curScreen > 1)
              oe.switchScreens(curScreen - 1);
            break;
          case 40: // Down
            var curScreen = parseInt($body.attr('data-active-screen'));
            if(curScreen < config.screenCount)
              oe.switchScreens(curScreen + 1);
            break;
        }
      });
    },

    switchScreens: function (targetScreen) {
      $body.attr('data-active-screen', targetScreen);
      $('.main-screen.active').removeClass('active');
      $('.main-screen[data-screen-no=' + targetScreen + ']').addClass('active');

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
        setTimeout(function () {
          $('#foundersSign').oeSvgDrawing({
            framesTotal: 200,
            colorCurrent: [51, 51, 51],
            colorTarget: [255, 255, 255],
            colorStroke: [255, 255, 255]
          });
        }, 1000);
      }

      // Special chain
      var $rect = $('.rectangle');
      if (targetScreen == 3) {
        setTimeout(function () {
          $rect.addClass('eff-chain');
        }, 800);
      } else {
        $rect.removeClass('eff-chain');
      }
    }
  };

  // Make it global
  window.oe = oe;
})(window, jQuery);

$(function () {
  // Some elements must fit the screen height
  //  so I create a specific class for all of 'em
  var screenHeight = $(window).outerHeight();
  $('.fitscreen').height(screenHeight);

  // Navigation button
  $('.btn-nav').click(function (e) {
    e.stopPropagation();
    $('.lines-button').toggleClass('close');
    $('.site-nav-wrapper, .first-half-page').toggleClass('active');
  });

  $('body, html').click(function () {
    $navBtn = $('.lines-button');
    if ($navBtn.hasClass('close')) {
      $navBtn.removeClass('close');
      $('.site-nav-wrapper, .first-half-page').removeClass('active');
    }
  });

  $('[data-toggle="tooltip"]').tooltip();

  // functions call
  oe.switchActions();
  oe.loader.init();

  // to test
  $('#loader').hide();
  oe.switchScreens(1);
//  $('#serviceModal1').modal('show');
});
