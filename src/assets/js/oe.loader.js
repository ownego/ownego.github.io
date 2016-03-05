(function ($, oe, document) {
  oe.loader = (function () {
    var loaderConfig = {
      loaderVer: '1.0.118',
      loaderDelay: 200, //default 500
      loaderSelector: '#loader',
      loaderCircle: '#loadingCircle',
      fontFamilies: ['Raleway:700:latin', 'Lato:400,400italic,700,300:latin'],
      fontPercent: 40,
      imgPercent: 60,
      point: 0,
      pushArr: []
    };
    var $loader = $(loaderConfig.loaderSelector);
    var $circle = $(loaderConfig.loaderCircle);

    return {
      init: function () {
        this.returnChecker();

        // Draw loading circle
        $circle.easyPieChart({
          barColor: '#5c5c5c',
          trackColor: '#ebebeb',
          scaleColor: false,
          lineCap: 'square',
          size: 100,
          animate: loaderConfig.loaderDelay,
          onStep: function (from, to, percent) {
            this.el.children[0].innerHTML = Math.round(percent) + '%';
          }
        });

        oe.loader.fontLoader();
        oe.loader.imageLoader();
      },

      pushValue: function (value) {
        // First time updating, trigger the clock.
        if (!loaderConfig.point) {
          oe.loader.updateValue();
        }

        loaderConfig.point += value;
        loaderConfig.pushArr.push(loaderConfig.point);
      },

      updateValue: function () {
        // Animations take much time to completed.
        //      these lines were used to make sure the pie animation runs smoothly
        var timer = setInterval(function () {
          if (loaderConfig.pushArr[0]) {
            $circle.data('easyPieChart').update(loaderConfig.pushArr[0]);
            loaderConfig.pushArr.shift();
            return;
          }
          // if everything loaded
          //      (100%)
          if (loaderConfig.point >= 100) {
            clearInterval(timer);
            oe.loader.end();
          }
        }, loaderConfig.loaderDelay);
      },

      fontLoader: function () {
        var fontLoaded = 0;
        WebFont.load({
          google: {
            families: loaderConfig.fontFamilies
          },
          active: function () {
            var val = loaderConfig.fontPercent - fontLoaded;
            oe.loader.pushValue(val);
          },
          fontactive: function (family, fvd) {
            var rand = Math.floor((Math.random() * 8) + 1);
            fontLoaded += rand;
            oe.loader.pushValue(rand);
          }
        });
      },

      imageLoader: function () {
        var imgCount = $('img').size();
        var imgValue = Math.floor(loaderConfig.imgPercent / imgCount);
        var imgLoaded = 0;

        $('body').imagesLoaded()
          .progress(function (instance, image) {
            imgLoaded += imgValue;
            oe.loader.pushValue(imgValue);
          })
          .always(function (instance) {
            oe.loader.pushValue(loaderConfig.imgPercent - imgLoaded);
          });
      },

      end: function () {
        $loader.on('click', '#startBtn', function () {
          setTimeout(function () {
            oe.hashUrl();
          }, 500);
          $loader.hide(); // Hide the loader

          ga('send','event', {
            eventCategory: 'layout',
            eventAction: 'Start button',
            eventLabel: 'Start button'
          });
        });
        $circle.addClass('done');
      },

      returnChecker: function() {
        var lastVer = Cookies.get('oe-ver');

        // If last version is too old
        //  Need to load data again
        if(!lastVer || lastVer != loaderConfig.loaderVer) {
          Cookies.set('oe-ver', loaderConfig.loaderVer, { expires: 14 });
        } else {
          setTimeout(function () {
            oe.hashUrl();
          }, 200);
          $loader.hide(); // Hide the loader
        }
      }
    };
  })();
})(jQuery, window.oe, window.document);
