var GraphicalEditor = (function(){
    "use strict";
    
    var graphic, X, Y;

    var _isValidPixel = function(x, y){
        return (x<=X && y<=Y && x>0 && y>0);
    };

    var _draw = function(x, y) {
        X = x;
        Y = y;
        graphic = new Array(y);
        
        var i, len = graphic.length;
        
        for (i = 0; i<len; i++){
            graphic[i]=new Array(x+1).join(0).split("");
        }
    };

    var _colorPixel = function(x, y, color) {
        if (_isValidPixel(x,y)) {
            graphic[y-1][x-1] = color;
        }
    };

    var _drawHLine = function(start, end, y, color){
        if (start<=end && start>0 && _isValidPixel(end, y)) {
            var i;
            for (i = start;i<=end;i++){
               graphic[y-1][i-1] = color;
            }
        }
    };

    var _drawVLine = function(x, start, end, color){
        if (start<=end && start>0 && _isValidPixel(x, end)) {
            var i;
            for (i = start;i<=end;i++){
               graphic[i-1][x-1] = color;
            }
        }
    };

    var _checkColor = function(x,y, color){
        if (_isValidPixel(x,y)) {
            return (graphic[y-1][x-1] === color);
        }
    };

    var _colorAdiacent = function(x, y, oldColor, color){
        if (_checkColor(x, y, oldColor)){
            _colorPixel(x,y, color);
            
            _colorAdiacent(x, y+1, oldColor, color);
            _colorAdiacent(x-1, y, oldColor, color);
            _colorAdiacent(x+1, y, oldColor, color);
            _colorAdiacent(x, y-1, oldColor, color);
        }
        
    };

    var _fill = function(x, y, color){
        if (_isValidPixel(x,y)){
            _colorAdiacent(x, y, graphic[y-1][x-1], color);
        }
    };

    return {
        draw: _draw,
        colorPixel: _colorPixel,
        drawHLine: _drawHLine,
        drawVLine: _drawVLine,
        fill: _fill,
        clear: function(){
            _draw(X, Y);
        },
        show: function(){
            return graphic.join("\n").replace(/\,/g, "");
        }
    };
});

module.exports = GraphicalEditor;