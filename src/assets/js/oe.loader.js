(function ($, oe, document) {
  oe.loader = (function () {
    var loaderConfig = {
      loaderDelay: 200, //default 500
      loaderSelector: '#loader',
      loaderCircle: '#loadingCircle',
      fontPercent: 40,
      imgPercent: 60,
      point: 0,
      pushArr: []
    };
    var $loader = $(loaderConfig.loaderSelector);
    var $circle = $(loaderConfig.loaderCircle);

    return {
      init: function () {
        // Draw loading circle
        $circle.easyPieChart({
          barColor: '#333',
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
            families: ['Roboto Condensed:700:latin,vietnamese',
                                   'Roboto:100,300,400,700:latin,vietnamese']
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
        var  imgCount = $('img').size();
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
            oe.switchScreens(1);
          }, 500);
          $loader.hide(); // Hide the loader
        });
        $circle.addClass('done');
      }
    };
  })();
})(jQuery, window.oe, window.document);
