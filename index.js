const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const path = require('path');
const server = http.Server(app);
const io = socketIO(server);
const Game = require('./lib/Game');


const FPS = 60;
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
let game = Game.create();
io.on('connection', function(socket) {
    socket.on('player-join', function() {
        game.addNewPlayer(socket);
    });

    socket.on('movement', function(data) {

    });
});

setInterval(function() {
    game.updateState();
}, 1000 / FPS);
