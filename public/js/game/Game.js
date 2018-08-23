
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
    canvas.width = 600;
    canvas.height = 400;
    canvas.style.border = '1px solid black';
    let context = canvas.getContext('2d');
    let draw = Draw.create(context);
    return new Game(socket, canvas, draw);
};

Game.prototype.init = function() {

};

Game.prototype.sendState = function() {

};
