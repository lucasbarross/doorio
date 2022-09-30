import { createDefaultPlayer } from './player/Player.js';
import { createDefaultGame } from './game/Game.js';

export class Lobby {
    constructor(gameRepository) {
        this.gameRepository = gameRepository;
        this.playersGames = new Map()
    }

    matchmake(socket) {
        const waitingGames = this.gameRepository.getWaitingGames()
        const playerId = socket.id;

        if (waitingGames.length > 0) {
            const chosenGame = waitingGames[0]
            const newPlayer = createDefaultPlayer(socket, 'red')
            chosenGame.addNewPlayer(newPlayer)
            this.gameRepository.setRunningGame(chosenGame.id)
            this.playersGames.set(playerId, chosenGame)
        } else {
            const newGame = createDefaultGame()
            const newPlayer = createDefaultPlayer(socket, 'blue')
            newGame.addNewPlayer(newPlayer)
            this.gameRepository.storeNewGame(newGame)
            this.playersGames.set(playerId, newGame)
        }
    }

    getPlayerRunningGame(playerId) {
        game = this.playersGames.get(playerId)

        if (game) {
            return this.gameRepository.GetRunningGame(game.id)
        }

        return null
    }

    removePlayer(playerId) {
        if (this.playersGames.has(playerId)) {
            existingGame = this.playersGames.get(playerId)
            existingGame.removePlayer(playerId)
            this.playersGames.delete(playerId)
        }
    }
}
