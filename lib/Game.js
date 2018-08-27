const HashMap = require('hashmap');
const Player = require('./Player');

/**
 * @constructor
 */
function Game() {
    this.clients = new HashMap();
    this.players = new HashMap();
    this.availableColors = ['blue', 'red'];
};

Game.create = function() {
    return new Game();
};

Game.prototype.addNewPlayer = function(socket) {
    let color = this.availableColors.shift();
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
    this.clients.delete(id);
    this.players.delete(id);
};

module.exports = Game;
