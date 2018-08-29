
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
    let draw = Draw.create(socket);
    return new Game(socket, canvas, draw);
};

Game.prototype.init = function() {
    this.animate();
    this.socket.emit('player-join');
    this.socket.on('update', (data) => this.getState(data));
    this.socket.on('stage', (stage) => {
        this.generateMap(stage);
    });
};

Game.prototype.generateMap = function(stage) {
    this.stage = stage;
    this.canvas.width = stage.canvas.width;
    this.canvas.height = stage.canvas.height;
    this.canvas.style.border = '1px solid black';
    this.draw.map(this.canvas, stage);
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

        this.draw.drawPlayers(this.canvas, this.player, this.otherPlayers, this.stage);
    }
    this.animate();
};
