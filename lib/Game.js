const HashMap = require('hashmap');
const Player = require('./Player');

/**
 * @constructor
 */
function Game() {
    this.clients = new HashMap();
    this.players = new HashMap();
};

Game.create = function() {
    return new Game();
};

Game.prototype.addNewPlayer = function(socket) {
    this.clients.set(socket.id, socket);
    this.players.set(socket.id, new Player());
};

Game.prototype.updateState = function() {
    let ids = this.clients.keys();
    for (let i = 0; i < ids.length; ++i) {
        this.clients.get(ids[i]).emit('update', {
            self: this.players.get(ids[i]),
            players: this.players.values().filter((player) => player.id != ids[i]),
        });
    }
};


module.exports = Game;
