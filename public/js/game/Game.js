
/**
 * @constructor
 * @param {SocketIO} socket
 * @param {Draw} draw
 */
function Game(socket, draw) {
    this.socket = socket;
    this.draw = draw;
};

Game.create = function(socket) {
    let draw = Draw.create(socket);
    return new Game(socket, draw);
};

Game.prototype.init = function() {
    this.animate();
    this.socket.emit('joinGame');
    this.socket.on('gameState', (gameState) => {
        this.draw.draw(gameState)
    });
};
