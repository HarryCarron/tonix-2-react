class CanvasUtilities {
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.canvasWidth = width;
        this.canvasHeight = height;
        return this;
    }

    relativeXPositioning = false;

    currentXPosition = 0;

    styleProfiles = {};

    clear() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        return this;
    }

    setStyleProfiles(profiles = {}) {
        this.styleProfiles = profiles;
        return this;
    }

    styleProfile(profileKey) {
        if (this.styleProfiles[profileKey]) {
            this.setStyle(this.styleProfiles[profileKey]);
        } else {
            console.error(`${profileKey} is not a recognised profile key!`);
        }
        return this;
    }

    setStyle(styles) {
        Object.keys(styles).forEach(key => {
            const value = styles[key];
            switch(key) {
                case 'strokeColor': this.ctx.strokeStyle = value; break;
                case 'lineWidth': this.ctx.lineWidth = value; break;
                case 'fillColor': this.ctx.fillStyle = value; break;
                case 'lineCap': this.ctx.lineCap = value; break;
                case 'lineDash': this.ctx.setLineDash(value); break;
                case 'font': this.ctx.font = value; break;
                case 'textAlign': this.ctx.textAlign = value; break;
                case 'fillStyle': this.ctx.fillStyle = value; break;
                default:
            };
        })

        return this;
    }

    getRelativeXCoordinates(x) {
        this.currentXPosition += x;
        return this.currentXPosition;
    }

    text(text, x, y) {
        this.ctx.fillText(text, x, y);
        return this;
    }

    line(x1, y1, x2, y2) {

        this.ctx.beginPath();

        if (this.relativeXPositioning) {
            x1 = this.getRelativeXCoordinates(x1);
            x2 = this.getRelativeXCoordinates(x2);
        }

        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);

        this.ctx.stroke();

        return this;
    }

    circle(x, y, r) {

        if (this.relativeXPositioning) {
            x = this.getRelativeXCoordinates(x);
        }

        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);
        this.ctx.stroke();
        
        return this;
    }

    startRelativeXPositioning() {
        this.relativeXPositioning = true;
        this.currentPosition = 0;
        return this;
    }

    endRelativeXPositioning() {
        this.relativePositioning = false;
        this.currentXPosition = 0;
        return this;
    }

}

export default CanvasUtilities;