(function ($, oe, document) {
  oe.eventTracking = (function() {
    return {
      init: function() {
        $('.ga-tracking').on('click', function() {
          var $this = $(this);

          var cat = $this.attr('data-tracking-cat'),
              action = $this.attr('data-tracking-action'),
              label = $this.attr('data-tracking-label');

          ga('send','event', {
            eventCategory: cat,
            eventAction: action,
            eventLabel: label
          });
        });

        $('.sub-title').on('mouseenter', function() {
          var $par = $(this).parents('.main-screen');
          var screen = $par.attr('data-screen-no');

          ga('send','event', {
            eventCategory: 'layout',
            eventAction: 'Quote hover',
            eventLabel: 'Quote hover screen ' + screen
          });
        });
      },
    };
  })();
})(jQuery, window.oe, window.document);
