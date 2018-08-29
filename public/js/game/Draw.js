
/**
 * @constructor
 * @param {SocketIO} socket
 * @param {Canvas} canvas
 */
function Draw(socket) {
    this.socket = socket;
};

Draw.create = function(socket) {
    return new Draw(socket);
};

Draw.prototype.map = function(canvas, stage) {
    canvas = canvas.getContext('2d');

    canvas.fillStyle = '#d6d6d6';

    for (let i = 0; i < stage.squareCount; i++) {
        let square = stage.squaresUp[i];
        canvas.fillRect(square.x, square.y, stage.squareWidth, stage.squareWidth);
    }

    canvas.fillStyle = '#351a00';
    for (let i = 0; i < stage.squareCount; i++) {
        let door = stage.doors[i];
        canvas.fillRect(door.x, door.y, stage.squareWidth, door.h);
    }

    canvas.fillStyle = '#d6d6d6';
    for (let i = 0; i < stage.squareCount; i++) {
        let square = stage.squaresDown[i];
        canvas.fillRect(square.x, square.y, stage.squareWidth, stage.squareWidth);
    }

    return {
        spawn: {
            blue: {
                x: stage.baseWidth + stage.squareWidth/2,
                y: 20 + stage.squareWidth/2,
            },
            red: {
                x: stage.baseWidth + stage.squareWidth/2,
                y: 145 + stage.squareWidth/2,
            },
        },
    };
};

Draw.prototype.drawPlayers = function(canvas, player, otherPlayers, stage) {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.map(canvas, stage);

    ctx.beginPath();
    ctx.arc(player.x, player.y, stage.playerRadius, 0, 2*Math.PI);
    ctx.fillStyle = player.color;
    ctx.fill();

    otherPlayers.forEach((otherPlayer) => {
        ctx.beginPath();
        ctx.arc(otherPlayer.x, otherPlayer.y, 25, 0, 2*Math.PI);
        ctx.fillStyle = otherPlayer.color;
        ctx.fill();
    });
};
