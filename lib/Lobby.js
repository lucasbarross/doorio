const HashMap = require('hashmap');
const Game = require('./Game');
const Stage = require('./Stage');
const uuid = require('uuid/v4');
const FPS = 60;

/**
 * @constructor
 */
function Lobby() {
    this.gamesRunning = new HashMap();
    this.socketToGameId = new HashMap();
    this.waitingForUsers = new HashMap();
}

Lobby.prototype.matchmake = function(socket) {
    let game;

    if (this.waitingForUsers.size > 0) {
        game = this.getWaitingGame();
        let gameId = uuid();
        game.addNewPlayer(socket);
        game.players.values().forEach((player) => {
            this.socketToGameId.set(player.id, gameId);
        });
        this.gamesRunning.set(gameId, game);
    } else {
        game = Game.create(Stage.create({squareCount: 4, squareWidth: 90, canvasWidth: 900, canvasHeight: 250, playerRadius: 25}));
        game.addNewPlayer(socket);
        this.waitingForUsers.set(socket.id, game);
    }

    setInterval(function() {
        game.updateState();
    }, 1000 / FPS);
};

Lobby.prototype.searchRunningGame = function(socketId) {
    let gameId = this.socketToGameId.get(socketId);
    return this.gamesRunning.get(gameId);
};

Lobby.prototype.getWaitingGame = function(socketId) {
    let gameInfo = this.waitingForUsers.entries()[0];
    let hostid = gameInfo[0];
    let gameObj = gameInfo[1];
    this.waitingForUsers.delete(hostid);
    return gameObj;
};

Lobby.prototype.removePlayer = function(socketId) {
    this.waitingForUsers.delete(socketId);

    let runningGame = this.searchRunningGame(socketId);

    if (runningGame) {
        runningGame.removePlayer(socketId);
    }
};

Lobby.create = function() {
    return new Lobby();
};

module.exports = Lobby;
