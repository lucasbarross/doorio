const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const path = require('path');
const server = http.Server(app);
const io = socketIO(server);
const Lobby = require('./lib/Lobby');

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

// let colors = ['red', 'blue'];
// let colorSelect = 0;

let lobby = Lobby.create();
// Add the WebSocket handlers
io.on('connection', function(socket) {
    socket.on('player-join', function() {
        lobby.matchmake(socket);
        // game.addNewPlayer(socket, colors[colorSelect]);
        // if (colorSelect == 0) colorSelect = 1;
        // else colorSelect = 0;
    });

    socket.on('action', function(data) {
        let game = lobby.searchRunningGame(socket.id);
        if (game) {
            let players = game.players;
            let player = players.get(socket.id);
            if (player) player.updateByInput(data, players);
        }
    });

    socket.on('disconnect', function() {
        lobby.removePlayer(socket.id);
        // if (player) {
        //     if (player.color == 'red') {
        //         colorSelect = 0;
        //     } else {
        //         colorSelect = 1;
        //     }
        // }
    });
});

