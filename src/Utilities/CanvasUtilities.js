class CanvasUtilities {
    constructor(canvas, width, height) {
        this.initCanvas(canvas, width, height);
        this.canvasWidth = width;
        this.canvasHeight = height;
        return this;
    }

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


    curve(startX, startY, cpX, cpY, endX, endY) {

        this.ctx.beginPath();


        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(startX, startY);
        this.ctx.quadraticCurveTo(cpX, cpY, endX, endY);

        this.ctx.stroke();

        return this;
    }

    rect(x, y, width, height, fill) {
        this.ctx.beginPath();
        if (fill) {
            this.ctx.fillRect(x, y, width, height);
            this.ctx.strokeRect(x, y, width, height);
        } else {
            this.ctx.rect(x, y, width, height);
        }
        this.ctx.stroke();
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

    initCanvas(canvas, width, height) {

        canvas.current.width = width * 3;
        canvas.current.height = height * 3;
        canvas.current.style.width = `${width}px`;
        canvas.current.style.height = `${height}px`;

        this.ctx = canvas.current.getContext('2d');
        this.ctx.scale(3, 3);

    }


    getTrueCoordinates(clientX, clientY, validate) {
        const canvasBB = this.canvas.current.getBoundingClientRect();
        const canvasTop = canvasBB.top;
        const canvasLeft = canvasBB.left;
        const relativeY = Math.floor(this.totalYTravel - ((clientY - canvasTop) - this.yPad));
        const relativeX = Math.floor((clientX - canvasLeft) - this.xPad);

        let mappedX = relativeX / this.totalXTravel
        let mappedY = relativeY / this.totalYTravel

        if (validate) {
            return [mappedX, mappedY].map(v => v >= 1 ? 1 : v <= 0 ? 0 : v);
        }
    
        return [
            mappedX,
            mappedY,
        ];
    }

}


export default CanvasUtilities;