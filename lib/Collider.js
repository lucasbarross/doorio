
/**
 * @constructor
 * @param {Number} hitbox
 */
function Collider(hitbox) {
    this.hitbox = hitbox;
};

Collider.create = function(id, color, stage) {
    return new Collider(id, color, stage);
};

Collider.prototype.collided = function(myPos, other) {
    let a = myPos.x - other.x;
    let b = myPos.y - other.y;
    let c = a*a + b*b;
    return c < this.hitbox * this.hitbox;
};

Collider.prototype.isMapBoundary = function(stage, playerPos) {
    const lastSquareDown = stage.squaresDown[stage.squaresDown.length-1];
    const firstSquareUp = stage.squaresUp[0];
    return firstSquareUp.x + stage.playerRadius > playerPos.x || lastSquareDown.x + stage.squareWidth < playerPos.x + stage.playerRadius
    || firstSquareUp.y + stage.playerRadius > playerPos.y || lastSquareDown.y + stage.squareWidth < playerPos.y + stage.playerRadius;
};

module.exports = Collider;
