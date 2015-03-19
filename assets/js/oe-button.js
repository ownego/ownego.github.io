(function($, OE, document){
    'use strict';

    var $doc = $(document);

    OE.button = {
        init: function() {
			new svgIcon( document.querySelector( '.si-icons-hover .si-icon-clock' ), svgIconConfig, { easing : mina.backin, evtoggle : 'mouseover', size : { w : 128, h : 128 } } );
			new svgIcon( document.querySelector( '.si-icons-hover .si-icon-hamburger' ), svgIconConfig, { easing : mina.backin, evtoggle : 'mouseover', size : { w : 128, h : 128 } } );
			new svgIcon( document.querySelector( '.si-icons-hover .si-icon-flag' ), svgIconConfig, { easing : mina.backin, evtoggle : 'mouseover', size : { w : 128, h : 128 } } );
			new svgIcon( document.querySelector( '.si-icons-hover .si-icon-zoom' ), svgIconConfig, { easing : mina.backin, evtoggle : 'mouseover', size : { w : 128, h : 128 } } );
			new svgIcon( document.querySelector( '.si-icons-hover .si-icon-maximize' ), svgIconConfig, { easing : mina.backin, evtoggle : 'mouseover', size : { w : 128, h : 128 } } );
			new svgIcon( document.querySelector( '.si-icons-hover .si-icon-equalizer' ), svgIconConfig, { easing : mina.backin, evtoggle : 'mouseover', size : { w : 128, h : 128 } } );
        }
    };
})(jQuery, window.OE, window.document);