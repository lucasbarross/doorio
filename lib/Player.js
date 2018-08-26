
/**
 * @constructor
 * @param {String} id
 * @param {String} color
 */
function Player(id, color) {
    this.id = id;
    this.color = color;
    this.x = 290;

    if (this.color == 'blue') {
        this.y = 65;
    } else {
        this.y = 190;
    }
};

Player.create = function(id, color) {
    return new Player(id, color);
};

Player.prototype.updateByInput = function(data) {
    this.x += 5 * (Number(data.right) - Number(data.left));
    this.y += 5 * (Number(data.down) - Number(data.up));
};

module.exports = Player;
