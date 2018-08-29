const HashMap = require('hashmap');
const Player = require('./Player');

/**
 * @constructor
 * @param {Object} stage
 */
function Game(stage) {
    this.clients = new HashMap();
    this.players = new HashMap();
    this.availableColors = ['blue', 'red'];
    this.stage = stage;
};

Game.create = function(stage) {
    return new Game(stage);
};

Game.prototype.addNewPlayer = function(socket) {
    let color = this.availableColors.shift();
    let stage = this.stage.getDefaultStage();
    this.clients.set(socket.id, socket);
    this.players.set(socket.id, Player.create(socket.id, color, stage));
    socket.emit('stage', stage);
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
