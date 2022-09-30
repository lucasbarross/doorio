$(document).ready(() => {
    let socket = io();
    
    let canvas = document.getElementById('canvas');
    canvas.width = canvas.height = 600

    document.addEventListener('keydown', (e) => socket.emit('keydown', e.keycode));

    let game = Game.create(socket);
    game.init();
});
