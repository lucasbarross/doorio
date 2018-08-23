$(document).ready(() => {
    let socket = io();
    let canvas = document.getElementById('canvas');

    Input.applyEventHandlers();

    let game = Game.create(socket, canvas);
    game.init();
});
