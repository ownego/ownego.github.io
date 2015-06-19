(function(window, $){
    var $doc = $(document);
    var $body = $('body');

    // Common functions
    var oe = {
        nextSwitch: function() {
            var screenCount = $('.main-screen').size();
            $doc.on('click', '#nextBtn', function() {
                var currentScreen = parseInt($body.attr('data-active-screen'));
                var nextScreen = (currentScreen == screenCount) ? 1 : (currentScreen + 1);

                $body.attr('data-active-screen', nextScreen);
                $('[data-screen-no=' + currentScreen + ']').removeClass('active');
                $('[data-screen-no=' + nextScreen + ']').addClass('active');
            });
        },

        effLogoName: function() {
            $('.texttl').textillate({
                initialDelay: 500
            });
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
    $('.btn-nav').click(function() {
        $(this).children('.lines-button').toggleClass('close');
        $('.site-nav-wrapper, .first-half-page').toggleClass('active');
    });

    // Delay to show the effects
    setTimeout(function() {
        var firstScreen = 1;
        $('body').attr('data-active-screen', firstScreen);
        $('[data-screen-no=' + firstScreen + ']').addClass('active');
    }, 500);

    oe.nextSwitch();
    oe.effLogoName();

    // Logo drawing via SVG
    var docElem = window.document.documentElement;
    window.requestAnimFrame = function(){
		return (
			window.requestAnimationFrame       || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame    || 
			window.oRequestAnimationFrame      || 
			window.msRequestAnimationFrame     || 
			function(/* function */ callback){
				window.setTimeout(callback, 1000 / 60);
			}
		);
	}();

	window.cancelAnimFrame = function(){
		return (
			window.cancelAnimationFrame       || 
			window.webkitCancelAnimationFrame || 
			window.mozCancelAnimationFrame    || 
			window.oCancelAnimationFrame      || 
			window.msCancelAnimationFrame     || 
			function(id){
				window.clearTimeout(id);
			}
		);
	}();

	function SVGEl(el) {
		this.el = el;
		this.image = this.el.previousElementSibling;
		this.current_frame = 0;
		this.total_frames = 120;
		this.path = new Array();
		this.length = new Array();
		this.handle = 0;
		this.init();
	}

	SVGEl.prototype.init = function() {
		var self = this;
		[].slice.call(this.el.querySelectorAll('path')).forEach(function(path, i) {
			self.path[i] = path;
			var l = self.path[i].getTotalLength();
			self.length[i] = l;
			self.path[i].style.strokeDasharray = l + ' ' + l; 
			self.path[i].style.strokeDashoffset = l;
		});
	};

	SVGEl.prototype.render = function() {
		if(this.rendered) return;
		this.rendered = true;
		this.draw();
	};

	SVGEl.prototype.draw = function() {
		var self = this,
			progress = this.current_frame/this.total_frames;
		if (progress > 1) {
			window.cancelAnimFrame(this.handle);
            self.fill();
		} else {
			this.current_frame++;
			for(var j=0, len = this.path.length; j<len;j++){
				this.path[j].style.strokeDashoffset = Math.floor(this.length[j] * (1 - progress));
			}
			this.handle = window.requestAnimFrame(function() {self.draw();});
		}
	};
    
    SVGEl.prototype.fill = function() {
        var self = this,
            currentColor = [255,255,255],
            targetColor = [0,0,0],
            strokeNone = [208,208,208],
            increment = [1,1,1];

        function startTransition() {
            currentColor[0] -= increment[0];
            currentColor[1] -= increment[1];
            currentColor[2] -= increment[2];

            var nextColor = "rgb(" + currentColor[0] + "," + currentColor[1] + "," + currentColor[2] + ")";
            for(var p=0, len = self.path.length; p < len; p++) {
                self.path[p].style.fill = nextColor;
            }
            
            if (currentColor[0] == strokeNone[0]) {
                for(var a=0, leng = self.path.length; a < leng; a++) {
                    self.path[a].style.stroke = 'none';
                }
            } else if (currentColor[0] == targetColor[0]) {
                clearInterval(transition);
            }
        }

        var transition = setInterval(function() {
            startTransition();
        }, 1000/120);
    };
	
	function init() {
		var svgs = Array.prototype.slice.call(document.querySelectorAll('#logo-oe')),
			svgArr = new Array();

		svgs.forEach(function(el, i) {
			var svg = new SVGEl(el);
			svgArr[i] = svg;
			setTimeout(function(el) {
				return function() {
					if(1) {
						svg.render();
					}
				};
			}(el), 1000); 
		});
	};

	init();
});
