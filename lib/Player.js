const Collider = require('./Collider');

/**
 * @constructor
 * @param {String} id
 * @param {String} color
 * @param {Object} stage
 * @param {Collider} collider
 * @param {Game} game
 */
function Player(id, color, stage, collider) {
    this.id = id;
    this.color = color;
    this.stage = stage;
    this.x = stage.spawn[color].x;
    this.y = stage.spawn[color].y;
    this.collider = collider;
    this.availableDoors = Array(stage.squareCount).fill(true);
};

Player.create = function(id, color, stage) {
    const collider = Collider.create(stage.playerRadius-5);
    return new Player(id, color, stage, collider);
};

Player.prototype.updateByInput = function(data, players) {
    this.updateAvailableDoors(players);

    const addX = this.x + 4 * (Number(data.right) - Number(data.left));
    let addY = this.y + 4 * (Number(data.down) - Number(data.up));
    const thisPlyInfo = {x: addX, y: addY, radius: this.stage.playerRadius};

    const collidedBoundary = this.collider.isMapBoundary(this.stage, thisPlyInfo);

    let collidedPlayer = {x: false, y: false};
    let collidedDoor = {x: false, y: false};

    players.forEach((ply) => {
        if (ply.id !== this.id) {
            collidedPlayer = this.collider.collidedWithPlayer(collidedPlayer, thisPlyInfo, {x: ply.x, y: ply.y, radius: this.stage.playerRadius});
            // collided = collided
            // // || Collider.circleIntersect(thisPlyInfo, {x: ply.x, y: ply.y, radius: this.stage.playerRadius})
            // || this.collider.collided(thisPlyInfo, {x: ply.x, y: ply.y});
        }
    });

    this.stage.doors.forEach((door, i) => {
        let d = {x: door.x, y: door.y, h: door.h, w: this.stage.squareWidth};
        let collidedWithDoorBounds = this.collider.collided(thisPlyInfo, d);
        let plyBlocking = false;
        if (Collider.circleRectIntersect(thisPlyInfo, d)) {
            if (!this.availableDoors[i]) plyBlocking = true;
            let modifier = Number(data.up) ? -1 : 1;
            addY = addY + door.h * modifier;
        }
        collidedDoor = {x: collidedDoor.x || collidedWithDoorBounds, y: collidedDoor.y || plyBlocking || collidedWithDoorBounds};
    });

    if (!collidedBoundary.x && !collidedPlayer.x && !collidedDoor.x) this.x = addX;
    if (!collidedBoundary.y && !collidedPlayer.y && !collidedDoor.y) this.y = addY;
    // }

    // this.x = addX + offsetX * multiplierH;
    // this.y = addY + offsetY * multiplierY;
};

Player.prototype.updateAvailableDoors = function(players) {
    let context = this;
    players.forEach((ply) => {
        context.stage.doors.forEach((door, i) => {
            if (ply.id !== context.id) {
                if (ply.x >= door.x && ply.x <= door.x + context.stage.squareWidth) {
                    context.availableDoors[i] = false;
                } else {
                    context.availableDoors[i] = true;
                }
            }
        });
    });
};

module.exports = Player;
