/*
* === SVG Simple Drawing ===
* Inspired by this one: http://tympanus.net/Development/SVGDrawingAnimation/
* Fast & handed code by Ser. Made with love for ownego official site.
* Require jQuery 1.11.
* ------------
* Just very fast coding, so maybe I made mistakes somewhere.
* Please tell me if you find out them. I will really appreciate.
*/
(function ($) {
    $.fn.oeSvgDrawing = function(options) {
        var svgDrawing = new oeSvgDraw(this, options);
    };

    $.fn.oeSvgDrawing.defaults = {
        debug: false,
        framesStart: 0,
        framesTotal: 100,
        framesFillTotal: 200,
        colorCurrent: [255, 255, 255],
        colorTarget: [51, 51, 51],
        colorStroke: [208, 208, 208],
        colorIncrement: [1, 1, 1]
    };

    var oeSvgDraw = function(element, options) {
        if(element) {
            this.$element = element;
            this.options = $.extend({}, $.fn.oeSvgDrawing.defaults, options);
            this.init();
        }
    };

    oeSvgDraw.prototype = {
        constructor: oeSvgDraw,

        debug: function(msg) {
            if(this.options.debug)
                console.log(msg);
        },

        init: function() {
            var self = this;
            this.frameCurrent = this.options.framesStart;
            this.path = new Array();
            this.length = new Array();
            this.handle = 0;

            this.debug('Init! Ready to render ' + this.$element.selector);

            // Find all paths in svg
            //  and then set stroke, dash equal to their distance (length).
            //  Ready to drawing.
            var paths = this.$element.children('path');
            this.pathCount = paths.size();

            paths.each(function(i, path) {
                self.path[i] = path;
                var len = self.path[i].getTotalLength();
                self.length[i] = len;
                self.path[i].style.strokeDasharray = len + ' ' + len;
                self.path[i].style.strokeDashoffset = len;

                self.path[i].style.fill   = 'rgb(' + self.options.colorCurrent[0] + ',\
                                                 ' + self.options.colorCurrent[1] + ',\
                                                 ' + self.options.colorCurrent[2] + ')';
                self.path[i].style.stroke = 'rgb(' + self.options.colorStroke[0] + ',\
                                                 ' + self.options.colorStroke[1] + ',\
                                                 ' + self.options.colorStroke[2] + ')';
            });

            this.render();
        },

        render: function() {
            this.debug('Render checking...');
            if(this.rendered) return;

            this.debug('Passed checking! Drawing...');
            this.rendered = true;
            this.draw();
        },

        draw: function() {
            var self = this;
            var progress = this.frameCurrent/this.options.framesTotal;

            if (progress > 1) {
                this.debug('Stop draw then fill the svg');
                self.fill();
                window.cancelAnimFrame(this.handle);
            } else {
                this.frameCurrent++;
                for(var j = 0; j < self.pathCount; j++) {
                    this.path[j].style.strokeDashoffset = Math.floor(this.length[j] * (1 - progress));
                }
                this.handle = window.requestAnimFrame(function() {self.draw();});
            }
        },

        fillLoop: function() {
            var self = this,
                currentColor = this.options.colorCurrent,
                targetColor = this.options.colorTarget,
                strokeColor = this.options.colorStroke,
                increment = this.options.colorIncrement;

            currentColor[0] += (currentColor[0] < targetColor[0]) ?  increment[0] : -increment[0];
            currentColor[1] += (currentColor[1] < targetColor[1]) ?  increment[1] : -increment[1];
            currentColor[2] += (currentColor[2] < targetColor[2]) ?  increment[2] : -increment[2];

            var nextColor = 'rgb(' + currentColor[0] + ',' + currentColor[1] + ',' + currentColor[2] + ')';
            for(var p = 0; p < self.pathCount; p++) {
                self.path[p].style.fill = nextColor;
            }

            if(currentColor[0] == targetColor[0]) {
                clearInterval(self.timerLoop);
                this.debug('Drawing completed.');
                delete this;
            } else if(currentColor[0] <= strokeColor[0]) {
                setTimeout(function() {
                    for(var i = 0; i < self.pathCount; i++) {
                        self.path[i].style.stroke = 'transparent';
                    }
                }, 500);
            }
        },

        fill: function() {
            var self = this;
            self.timerLoop = setInterval(function() {
                self.fillLoop();
            }, 1000/self.options.framesFillTotal);
        }
    }
})(window.jQuery);

window.requestAnimFrame = function() {
    return (
        window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        }
    );
}();

window.cancelAnimFrame = function() {
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


