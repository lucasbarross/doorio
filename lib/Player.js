const Collider = require('./Collider');

/**
 * @constructor
 * @param {String} id
 * @param {String} color
 * @param {Object} stage
 * @param {Collider} collider
 */
function Player(id, color, stage, collider) {
    this.id = id;
    this.color = color;
    this.stage = stage;
    this.x = stage.spawn[color].x;
    this.y = stage.spawn[color].y;
    this.collider = collider;
};

Player.create = function(id, color, stage) {
    const collider = Collider.create(stage.playerRadius);
    return new Player(id, color, stage, collider);
};

Player.prototype.updateByInput = function(data, players) {
    const addX = this.x + 4 * (Number(data.right) - Number(data.left));
    const addY = this.y + 4 * (Number(data.down) - Number(data.up));
    let collided = false;

    players.forEach((ply) => {
        if (ply.id !== this.id) {
            collided = collided || this.collider.collided({x: addX, y: addY}, {x: ply.x, y: ply.y});
        }
    });

    this.stage.doors.forEach((door) => {
        collided = collided || this.collider.collided({x: addX, y: addY}, {x: door.x, y: door.y});
    });

    if (!collided && !this.collider.isMapBoundary(this.stage, {x: addX, y: addY})) {
        this.x = addX;
        this.y = addY;
    }
};

module.exports = Player;
