
/**
 * @constructor
 */
function Input() {

}

Input.LEFT = false;
Input.UP = false;
Input.RIGHT = false;
Input.DOWN = false;
Input.MISC_KEYS = {};

Input.onKeyDown = function(event) {
    switch (event.keyCode) {
        case 37:
        case 65:
        Input.LEFT = true;
        break;
        case 38:
        case 87:
        Input.UP = true;
        break;
        case 39:
        case 68:
        Input.RIGHT = true;
        break;
        case 40:
        case 83:
        Input.DOWN = true;
        break;
        default:
        Input.MISC_KEYS[event.keyCode] = true;
        break;
    }
};

Input.onKeyUp = function(event) {
    switch (event.keyCode) {
        case 37:
        case 65:
        Input.LEFT = false;
        break;
        case 38:
        case 87:
        Input.UP = false;
        break;
        case 39:
        case 68:
        Input.RIGHT = false;
        break;
        case 40:
        case 83:
        Input.DOWN = false;
        break;
        default:
        Input.MISC_KEYS[event.keyCode] = false;
    }
};

Input.applyEventHandlers = function() {
    document.addEventListener('keyup', Input.onKeyUp);
    document.addEventListener('keydown', Input.onKeyDown);
};
