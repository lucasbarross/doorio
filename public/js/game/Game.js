
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
    this.draw = draw;
    return new Game(socket, canvas, draw);
};

Game.prototype.init = function() {
    this.animate();
    this.socket.emit('player-join');
    this.socket.on('update', (data) => this.getState(data));
};

Game.prototype.getState = function(data) {
    this.player = data.self;
    this.otherPlayers = data.players;
};

Game.prototype.animate = function() {
    this.animationFrameId = window.requestAnimationFrame(this.updateDraw.bind(this));
};

Game.prototype.updateDraw = function() {
    this.animate();
};

Game.prototype.sendState = function() {
};
