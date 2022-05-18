// importing libraries
import "mathFunc.js";
// class to deal with the plane
class Plane {
    constructor(canvas) {
        //--- verifying parameter
        if (typeof canvas != "object" || canvas.tagName != "CANVAS") {
            throw "Parameter is not a canvas";
        }
        //--- declaring attributes
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.step = "1";
        this.stepSize = "25";
        this.mainGridColor = "rgba(0, 0, 0, 1)";
        this.auxiliaryGridColor = "rgba(0, 0, 0, 0.2)";
        this.originX = (this.canvas.width / 2);
        this.originY = (this.canvas.height / 2);

    }
    //------- configuration methods
    /**
     * Sets the frequency of implementation to draw the selected function
     * @param {Number} lenght   Integer number that defines the step
     */
    setStep(lenght) {
        if (!parseFloat(lenght)) {
            throw "Parameter is not a number";
        }
        this.step = parseFloat(lenght);
    }
    /**
     * Sets the distance between each gridline in the axis
     * @param {Number} lenght   Integer number that defines the step size
     */
    setStepSize(lenght) {
        if (!parseInt(lenght)) {
            throw "Parameter is not a number";
        }
        this.stepSize = parseInt(lenght);
    }
    /**
     * Defines the main axis grid color
     * @param {Number} r    intensity of red [0-255]
     * @param {Number} g    intensity of green [0-255]
     * @param {Number} b    intensity of blue [0-255]
     * @param {Number} a    opacity [0-1]
     */
    setGridColor(r, g, b, a) {
        if (r < 0 || r > 255 || !Math.ceil(r)) {
            throw "Red chanel parameter is not valid";
        }
        if (g < 0 || g > 255 || !Math.ceil(g)) {
            throw "Green chanel parameter is not valid";
        }
        if (b < 0 || b > 255 || !Math.ceil(b)) {
            throw "Blue chanel parameter is not valid";
        }
        if (a < 0 || a > 1) {
            throw "Alpha chanel parameter is not valid";
        }
        this.mainGridColor = "rgba(" + Math.ceil(r) + ", " + Math.ceil(g) + ", " + Math.ceil(b) + ", " + a + ")";
    }
    /**
     * Defines the auxiliary's grid color
     * @param {Number} r    intensity of red [0-255]
     * @param {Number} g    intensity of green [0-255]
     * @param {Number} b    intensity of blue [0-255]
     * @param {Number} a    opacity [0-1]
     */
    setAuxiliaryColor(r, g, b, a) {
        if (r < 0 || r > 255 || !Math.ceil(r)) {
            throw "Red chanel parameter is not valid";
        }
        if (g < 0 || g > 255 || !Math.ceil(g)) {
            throw "Green chanel parameter is not valid";
        }
        if (b < 0 || b > 255 || !Math.ceil(b)) {
            throw "Blue chanel parameter is not valid";
        }
        if (a < 0 || a > 1) {
            throw "Alpha chanel parameter is not valid";
        }
        this.mainAuxiliaryColor = "rgba(" + Math.ceil(r) + ", " + Math.ceil(g) + ", " + Math.ceil(b) + ", " + a + ")";
    }
    //------- rendering methods
    /**
     * Clears the whole plane
     */
    clearAll() {
        // clearing canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    /**
     * Draws the main and auxiliarys grid, and place the numbers in the grids
     */
    drawGrid() {
        // setting up text
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillStyle = "rgba(0,0,0,1)";
        this.ctx.strokeStyle = "rgba(0,0,0,1)";
        // setting up main axis
        this.ctx.strokeStyle = this.mainGridColor;
        this.ctx.beginPath();
        // x-axis
        this.ctx.moveTo(0, originY);
        this.ctx.lineTo(this.canvas.width, originY);
        // y-axis
        this.ctx.moveTo(originX, 0);
        this.ctx.lineTo(originX, this.canvas.height);
        // stroke
        this.ctx.stroke();
        // setting up secondary axis
        this.ctx.strokeStyle = this.auxiliaryGridColor;
        // x-axis
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "top";
        for (let i = this.stepSize; i <= originX; i += this.stepSize) {
            this.ctx.moveTo((originX - i), 0);
            this.ctx.lineTo((originX - i), this.canvas.height);
            this.ctx.moveTo((originX + i), 0);
            this.ctx.lineTo((originX + i), this.canvas.height);
            this.ctx.fillText((i / this.stepSize), (this.originX + i), this.originY);
            this.ctx.fillText((-i / this.stepSize), (this.originX - i), this.originY);
        }
        // y-axis
        this.ctx.textAlign = "right";
        this.ctx.textBaseline = "middle";
        for (let i = this.stepSize; i <= originY; i += this.stepSize) {
            this.ctx.moveTo(0, (originY - i));
            this.ctx.lineTo(this.canvas.width, (originY - i));
            this.ctx.moveTo(0, (originY + i));
            this.ctx.lineTo(this.canvas.width, (originY + i));
            this.ctx.fillText((i / this.stepSize), this.originX, (this.originY - i));
            this.ctx.fillText((-i / this.stepSize), this.originX, (this.originY + i));
        }
        // stroke
        this.ctx.stroke();
        // end path
        this.ctx.closePath();
    }
    /**
     * Converts matrix coordinates to pixel coordinates
     * @param {Number} x    x-axis coordinate
     * @param {Number} y    y-axis coordinate
     * @returns {Object} {"x": n, "y": n}
     */
    matrixToMap(x, y) {
        return {"x": ((x * this.stepSize) + this.originX), "y": ((y * this.stepSize) - this.originY)}
    }
    /**
     * Converts pixel coordinates to matrix coordinates
     * @param {Number} x    x-axis coordinate
     * @param {Number} y    y-axis coordinate
     * @returns {Object} {"x": n, "y": n}
     */
    mapToMatrix(x, y) {
        return {"x": ((x - originX) / this.stepSize),"y": ((originY - y) / this.stepSize)}
    }
}