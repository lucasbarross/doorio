import { Stage } from '../stage/Stage.js';
import { v4 as uuidv4 } from 'uuid';
/**
 * @constructor
 * @param {Object} stage
 */
class Game {
    constructor(stage) {
        this.id = uuidv4() 
        this.players = new Map();
        this.stage = stage;
    }

    addNewPlayer(player) {
        this.players.set(player.id, player);
    }

    removePlayer(player) {
        this.players.delete(player.id);
    }
};

export const createDefaultGame = () => {
    return new Game(new Stage({squareCount: 4, squareWidth: 90, canvasWidth: 900, canvasHeight: 250, playerRadius: 25}))
}

// Game.prototype.updateState = function() {
//     let ids = this.clients.keys();
//     for (let i = 0; i < ids.length; ++i) {
//         this.clients.get(ids[i]).emit('update', {
//             self: this.players.get(ids[i]),
//             players: this.players.values().filter((player) => player.id !== ids[i]),
//         });
//     }
// };

// Game.prototype.removePlayer = function(id) {
//     this.clients.delete(id);
//     this.players.delete(id);
// };

// module.exports = Game;
