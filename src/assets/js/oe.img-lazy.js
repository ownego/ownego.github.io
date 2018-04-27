(function ($, oe, document) {
  oe.imgLazy = (function() {
    return {
      init: function() {
        oe.imgLazy.modalOpened();
      },

      modalOpened: function() {
        $('[data-toggle="modal"]').on('click', function() {
          var modalSelector = $(this).data('target');
          var $modal = $(modalSelector);

          if(!$modal.hasClass('img-loaded')) {
            // Set Loading
            $modal.find('.prj-ss').addClass('loading');

            // Put src to img
            $modal
              .addClass('img-loaded')
              .find('.lazy-img').each(function() {
                oe.imgLazy.loadImage($(this));
              });

            // Check loaded
            $modal.imagesLoaded('.lazy-img')
              .progress(function (instance, image) {
                $(image.img).parent('.prj-ss').removeClass('loading');
              });
          }

        });
      },

      loadImage: function($imgElement) {
        var imgSrc = $imgElement.data('unset-src');
        $imgElement.attr('src', imgSrc);
      }
    };
  })();
})(jQuery, window.oe, window.document);
