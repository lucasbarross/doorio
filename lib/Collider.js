
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
    return a * a + b * b < this.hitbox * this.hitbox;
};

Collider.circleIntersect = function(one, two) {
    let radiusDiff = (one.radius - two.radius) * (one.radius - two.radius);
    let posDiff = (one.x - two.x) * (one.x - two.x) + (one.y - two.y) * (one.y - two.y);
    return radiusDiff <= posDiff && posDiff <= (one.radius + two.radius) * (one.radius + two.radius);
};

Collider.circleRectIntersect = function(circle, rect) {
    let DeltaX = circle.x - Math.max(rect.x, Math.min(circle.x, rect.x + rect.w));
    let DeltaY = circle.y - Math.max(rect.y, Math.min(circle.y, rect.y + rect.h));
    return (DeltaX * DeltaX + DeltaY * DeltaY) < (circle.radius * circle.radius);
};

Collider.prototype.collidedWithPlayer = function(collided, playerInfo, other) {
    let a = playerInfo.x - other.x;
    let b = playerInfo.y - other.y;
    let close = Math.sqrt(a * a + b * b) <= playerInfo.radius + other.radius;
    let collX = close && (playerInfo.x + playerInfo.radius <= other.x - other.radius || playerInfo.x - playerInfo.radius >= other.radius);
    let collY = close && (playerInfo.y + playerInfo.radius <= other.y - other.radius || playerInfo.y - playerInfo.radius >= other.radius);
    return {
            x: collided.x || collX,
            y: collided.y || collY,
        };
};
// Collider.prototype.collidedWithPlayer = function(collided, playerInfo, other) {
//     let radiusDiff = (playerInfo.radius - other.radius) * (playerInfo.radius - other.radius);
//     let posDiff = (playerInfo.x - other.x) * (playerInfo.x - other.x) + (playerInfo.y - other.y) * (playerInfo.y - other.y);
//     const result = radiusDiff <= posDiff && posDiff <= (playerInfo.radius + other.radius) * (playerInfo.radius + other.radius);
//     return {
//             x: collided.x || result,
//             y: collided.y || result,
//         };
// };

Collider.prototype.isMapBoundary = function(stage, playerPos) {
    const lastSquareDown = stage.squaresDown[stage.squaresDown.length-1];
    const firstSquareUp = stage.squaresUp[0];
    let collision = {x: false, y: false};

    if (firstSquareUp.x + stage.playerRadius > playerPos.x || lastSquareDown.x + stage.squareWidth < playerPos.x + stage.playerRadius) {
        collision.x = true;
    }

    if (firstSquareUp.y + stage.playerRadius > playerPos.y || lastSquareDown.y + stage.squareWidth < playerPos.y + stage.playerRadius) {
        collision.y = true;
    };

    return collision;
};

module.exports = Collider;
