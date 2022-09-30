
/**
 * @constructor
 * @param {SocketIO} socket
 * @param {Canvas} canvas
 */
function Draw() {
    this.canvas = document.getElementById('canvas');
};

Draw.create = function() {
    return new Draw();
};

Draw.prototype.draw = function(gameState) {
    this.drawMap(gameState.stage)
    this.drawPlayers(gameState.players)
}

Draw.prototype.drawMap = function(mapState) {
    const canvas = this.canvas.getContext('2d');

    canvas.fillStyle = '#d6d6d6';

    for (let i = 0; i < mapState.squareCount; i++) {
        let square = mapState.squaresUp[i];
        canvas.fillRect(square.x, square.y, mapState.squareWidth, mapState.squareWidth);
    }

    canvas.fillStyle = '#351a00';
    for (let i = 0; i < mapState.squareCount; i++) {
        let door = mapState.doors[i];
        canvas.fillRect(door.x, door.y, mapState.squareWidth, door.h);
    }

    canvas.fillStyle = '#d6d6d6';
    for (let i = 0; i < mapState.squareCount; i++) {
        let square = mapState.squaresDown[i];
        canvas.fillRect(square.x, square.y, mapState.squareWidth, mapState.squareWidth);
    }

    return {
        spawn: {
            blue: {
                x: mapState.baseWidth + mapState.squareWidth/2,
                y: 20 + mapState.squareWidth/2,
            },
            red: {
                x: mapState.baseWidth + mapState.squareWidth/2,
                y: 145 + mapState.squareWidth/2,
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
