export class GameRepository {
    constructor() {
        this.runningGames = new Set();
        this.waitingGames = new Set();
        this.games = new Map();
    }

    getWaitingGames() {
        return Array.from(this.waitingGames).map((id) => this.games.get(id));
    }

    setRunningGame(gameId) {
        this.waitingGames.delete(gameId);
        this.runningGames.add(gameId);
    }

    getRunningGame(gameId) {
        return this.games.get(gameId);
    }
    
    storeNewGame(game) {
        this.waitingGames.add(game.id)
        this.games.set(game.id, game)
    }
}