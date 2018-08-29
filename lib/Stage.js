
/**
 * @constructor
 * @param {Number} squareCount
 * @param {Number} squareWidth
 * @param {Number} canvasWidth
 * @param {Number} canvasHeight
 */
function Stage({squareCount, squareWidth, canvasWidth, canvasHeight, playerRadius}) {
    this.squareCount = squareCount;
    this.squareWidth = squareWidth;
    this.playerRadius = playerRadius;
    this.canvas = {
        width: canvasWidth,
        height: canvasHeight,
    };
};

Stage.create = function(stageData) {
    return new Stage(stageData);
};


Stage.prototype.getDefaultStage = function() {
    let squareCount = this.squareCount;
    let squareWidth = this.squareWidth;
    let playerRadius = this.playerRadius;
    let canvas = this.canvas;
    let baseWidth = (canvas.width/2) - (squareWidth/2) - squareCount * 40;

    let doors = [];
    let squaresUp = [];
    let squaresDown = [];

    for (let i = 0; i < squareCount; i++) {
        doors.push({
            x: baseWidth + i*100,
            y: 115,
            h: 25,
        });

        squaresUp.push({
            x: baseWidth + i*100,
            y: 20,
        });

        squaresDown.push({
            x: baseWidth + i*100,
            y: 145,
        });
    }
    return {
        canvas,
        baseWidth,
        squareCount,
        squareWidth,
        playerRadius,
        doors,
        squaresUp,
        squaresDown,
        spawn: {
            blue: {
                x: baseWidth + squareWidth/2,
                y: 20 + squareWidth/2,
            },
            red: {
                x: baseWidth + 255 + squareWidth,
                y: 145 + squareWidth/2,
            },
        },
    };
};

module.exports = Stage;
