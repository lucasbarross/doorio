
/**
 * @constructor
 * @param {Canvas} canvas
 */
function Draw(canvas) {
    this.canvas = canvas;
};

Draw.create = function(socket, canvas) {
    return new Draw(socket, canvas);
};

Draw.prototype.map = function() {
    let canvas = this.canvas.getContext('2d');
    let squareCount = 4;
    let squareWidth = 90;
    let baseWidth = (this.canvas.width/2) - (squareWidth/2) - squareCount * 40;

    canvas.fillStyle = '#d6d6d6';
    for (let i = 0; i < squareCount; i++) {
        canvas.fillRect(baseWidth + i*100, 20, squareWidth, squareWidth);
    }

    canvas.fillStyle = '#351a00';
    for (let i = 0; i < squareCount; i++) {
        canvas.fillRect(baseWidth + i*100, 115, squareWidth, 25);
    }

    canvas.fillStyle = '#d6d6d6';
    for (let i = 0; i < squareCount; i++) {
        canvas.fillRect(baseWidth + i * 100, 145, squareWidth, squareWidth);
    }
};
