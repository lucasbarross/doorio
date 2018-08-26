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

Game.prototype.addNewPlayer = function(socket, color) {
    this.clients.set(socket.id, socket);
    this.players.set(socket.id, Player.create(socket.id, color));
};

Game.prototype.updateState = function() {
    let ids = this.clients.keys();
    for (let i = 0; i < ids.length; ++i) {
        this.clients.get(ids[i]).emit('update', {
            self: this.players.get(ids[i]),
            players: this.players.values().filter((player) => player.id !== ids[i]),
        });
    }
};

Game.prototype.removePlayer = function(id) {
    this.clients.remove(id);
    this.players.remove(id);
};

module.exports = Game;
