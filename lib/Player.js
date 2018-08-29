
/**
 * @constructor
 * @param {String} id
 * @param {String} color
 * @param {Object} stage
 */
function Player(id, color, stage) {
    this.id = id;
    this.color = color;
    this.stage = stage;
    this.canGoUpDown = true;
    this.x = stage.spawn[color].x;
    this.y = stage.spawn[color].y;
};

Player.create = function(id, color, stage) {
    return new Player(id, color, stage);
};

Player.prototype.updateByInput = function(data) {
    this.x += 5 * (Number(data.right) - Number(data.left));
    this.stage.doors.forEach((door) => {
        if (this.x - this.stage.playerRadius > door.x && this.x + this.stage.playerRadius < door.x + this.stage.squareWidth) {
            this.y += (10 * (Number(data.down) - Number(data.up)));
        }
    });
};

module.exports = Player;
