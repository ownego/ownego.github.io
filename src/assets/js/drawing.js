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
    this.total_frames = 100;
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
        targetColor = [51,51,51],
        strokeColor = [208,208,208],
        increment = [1,1,1];

    function startTransition() {
        currentColor[0] -= increment[0];
        currentColor[1] -= increment[1];
        currentColor[2] -= increment[2];

        var nextColor = "rgb(" + currentColor[0] + "," + currentColor[1] + "," + currentColor[2] + ")";
        for(var p=0, len = self.path.length; p < len; p++) {
            self.path[p].style.fill = nextColor;
        }

        if (currentColor[0] == targetColor[0]) {
            clearInterval(transition);
        } else if (currentColor[0] <= strokeColor[0]) {
            for(var a=0, leng = self.path.length; a < leng; a++) {
                var colorComponent = componentToHex(currentColor[0]);
                self.path[a].style.stroke = "#" + colorComponent + colorComponent + colorComponent;
            }
        }
    }

    var transition = setInterval(function() {
        startTransition();
    }, 1000/120);
};

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
