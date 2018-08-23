
/**
 * @constructor
 * @param {SocketIO} socket
 * @param {Canvas} canvas
 * @param {Draw} draw
 */
function Game(socket, canvas, draw) {
    this.socket = socket;
    this.canvas = canvas;
    this.draw = draw;
};

Game.create = function(socket, canvas) {
    let draw;
    canvas.width = 900;
    canvas.height = 250;
    canvas.style.border = '1px solid black';
    draw = Draw.create(canvas);
    draw.map();
    return new Game(socket, canvas, draw);
};

Game.prototype.init = function() {

};

Game.prototype.sendState = function() {

};
