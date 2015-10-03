(function ($, oe, document) {
  var $punchsGroup = $('.punchs-group');
  var pageCount = $punchsGroup.size();

  oe.punchs = (function() {
    return {
      init: function() {
        var dotTemp = '';
        for(var i = 0; i < pageCount; ++i) {
          var extraClass = !i ? ' active' : '';
          dotTemp += '<a href="#" class="punchs-dot' + extraClass + '">&nbsp;</a>';
        }
        $('#punchsControl').html(dotTemp);

        $('.punchs-dot').on('click', function(e) {
          e.preventDefault();
          var index = $(this).index();
          oe.punchs.changePunchs(index);
        });
      },
      changePunchs: function(index) {
        var $punchsDot = $('.punchs-dot');
        $punchsDot.removeClass('active').eq(index).addClass('active');
        $punchsGroup.removeClass('active').eq(index).addClass('active');
      }
    };
  })();

  oe.switchCallback = function(curScreen, event) {
    if(curScreen == 2) {
      var curDot = $('.punchs-dot.active').index();
      var index = (event == 'next') ? curDot + 1 : curDot - 1;

      if(index < pageCount && index > -1) {
        console.log('ok');
        oe.punchs.changePunchs(index);
        return true;
      } else {
        console.log('not ok');
        return false;
      }
    }
    return false;
  };
})(jQuery, window.oe, window.document);
