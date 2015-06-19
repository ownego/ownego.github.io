// Logo drawing via SVG
SVGEl.prototype.defaults = {
    startFrame: 0,
    totalFrames: 100,
    colorCurrent: [255, 255, 255],
    colorTarget: [51, 51, 51],
    colorStroke: [208, 208, 208],
    colorIncrement: [1, 1, 1]
};

function SVGEl(el, options) {
    var options = options || {};
    this.config = {};
    $.extend(this.config, this.defaults, options);

    this.el = el;
    this.image = this.el.previousElementSibling;
    this.current_frame = this.config.startFrame;
    this.total_frames = this.config.totalFrames;
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

        self.path[i].style.fill = 'rgb(' + self.config.colorCurrent[0] + ',' + self.config.colorCurrent[1] + ',' + self.config.colorCurrent[2] + ')';
        self.path[i].style.stroke = 'rgb(' + self.config.colorStroke[0] + ',' + self.config.colorStroke[1] + ',' + self.config.colorStroke[2] + ')';
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
        currentColor = this.config.colorCurrent,
        targetColor = this.config.colorTarget,
        strokeColor = this.config.colorStroke,
        increment = this.config.colorIncrement;

    function startTransition() {
        currentColor[0] += (currentColor[0] < targetColor[0]) ?  increment[0] : -increment[0];
        currentColor[1] += (currentColor[1] < targetColor[1]) ?  increment[1] : -increment[1];
        currentColor[2] += (currentColor[2] < targetColor[2]) ?  increment[2] : -increment[2];

        var nextColor = "rgb(" + currentColor[0] + "," + currentColor[1] + "," + currentColor[2] + ")";
        for(var p=0, len = self.path.length; p < len; p++) {
            self.path[p].style.fill = nextColor;
        }

        if (currentColor[0] == targetColor[0]) {
            clearInterval(transition);
        } else if (currentColor[0] <= strokeColor[0]) {
            for(var a=0, leng = self.path.length; a < leng; a++) {
                self.path[a].style.stroke = 'transparent';
            }
        }
    }

    var transition = setInterval(function() {
        startTransition();
    }, 1000/this.config.totalFrames);
};

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

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
