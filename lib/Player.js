
/**
 * @constructor
 * @param {String} id
 */
function Player(id) {
    this.id = id;
};

Player.create = function(id) {
    return new Player(id);
};

module.exports = Player;
