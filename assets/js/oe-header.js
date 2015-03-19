(function($, OE, document){
    'use strict';
    
    var $doc = $(document);

    // Common functions
    OE.header = {
        init: function() {
        	var headerExps = $('.header-expand');
        	headerExps.each(function() {
        		var currentId = $(this).attr('id');
        		$(this).on('show.bs.collapse', function () {
        			headerExps.each(function() {
        				if($(this).attr('id') != currentId && $(this).hasClass('in')) {
        					$(this).collapse('hide');
        				}
        			});
                })
            })
        }
    };
})(jQuery, window.OE, window.document);