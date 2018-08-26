
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
    this.player = undefined;
    this.otherPlayers = [];
};

Game.create = function(socket, canvas) {
    canvas.width = 900;
    canvas.height = 250;
    canvas.style.border = '1px solid black';
    let draw = Draw.create(canvas);
    draw.map();
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
    if (this.player) {
        this.socket.emit('action', {
            up: Input.UP,
            right: Input.RIGHT,
            down: Input.DOWN,
            left: Input.LEFT,
        });

        this.draw.drawPlayers(this.player, this.otherPlayers);
    }
    this.animate();
};

Game.prototype.sendState = function() {
};
