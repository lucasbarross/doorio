import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import path from 'path'
import { Lobby } from './lib/Lobby.js'
import { GameRepository } from './lib/game/GameRepository.js'
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.Server(app);
const io = new Server(server);
const gameRepository = new GameRepository()
const lobby = new Lobby(gameRepository);

app.set('port', 5000);
app.use(express.static(__dirname + '/public'));

// Routing
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

// Starts the server.
server.listen(5000, function() {
  console.log('Starting server on port 5000');
});

// Add the WebSocket handlers
io.on('connection', function(socket) {
    socket.on('joinGame', function() {
        lobby.matchmake(socket);
    });

    socket.on('keydown', function(keycode) {
        let game = lobby.searchRunningGame(socket.id);

        if (game) {
            let players = game.players;
            let player = players.get(socket.id);
            if (player) player.updateByInput(keycode, players);
            players.forEach(player => {
                player.socket.emit('gameState', game)
            });
        }
    });

    socket.on('disconnect', function(socket) {
        lobby.removePlayer(socket.id);
    });
});

