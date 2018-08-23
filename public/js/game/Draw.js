
/**
 * @constructor
 * @param {CanvasRenderingContext2D} canvas
 */
function Draw(canvas) {
    this.canvas = canvas;
};

Draw.create = function(socket, canvas) {
    return new Draw(socket, canvas);
};

Draw.prototype.map = function(canvas) {

};
