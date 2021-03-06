class CanvasUtilities {
    xPad = 0;
    yPad = 0;

    constructor(canvas, xPad, yPad, width, height, setCanvasDims) {
        this.xPad = xPad;
        this.yPad = yPad;
        this.initCanvas(canvas, width, height, setCanvasDims);
        this.canvasWidth = width;
        this.canvasHeight = height;
        return this;
    }

    shape = [];
    trackingShape = false;

    styleProfiles = {};

    clear() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        return this;
    }

    setStyleProfiles(profiles = {}) {
        this.styleProfiles = profiles;
        return this;
    }

    trackShape() {
        this.trackingShape = true;
        return this;
    }

    stopTrackingShape() {
        this.trackingShape = false;
        return this;
    }

    drawShape(clear, close) {
        this.ctx.beginPath();

        let startingPoint;

        this.shape.forEach((def, i, o) => {
            const action = def.line ?? def.curve;

            if (!i) {
                if (def.line) {
                    startingPoint = def.params.slice(0, 2);
                } else if (def.curve) {
                    startingPoint = def.params.slice(0, 2);
                }
                this.ctx.moveTo(...startingPoint);
            }

            action(def.params);
            this.ctx.strokeStyle = 'rgba(0,0,0,0)';
            this.ctx.stroke();
        });

        if (close) {
            this.ctx.closePath();
        }

        if (clear) {
            this.shape = [];
        }
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
            switch (key) {
                case 'strokeColor':
                    this.ctx.strokeStyle = value;
                    break;
                case 'lineWidth':
                    this.ctx.lineWidth = value;
                    break;
                case 'fillColor':
                    this.ctx.fillStyle = value;
                    break;
                case 'lineCap':
                    this.ctx.lineCap = value;
                    break;
                case 'lineDash':
                    this.ctx.setLineDash(value);
                    break;
                case 'font':
                    this.ctx.font = value;
                    break;
                case 'textAlign':
                    this.ctx.textAlign = value;
                    break;
                case 'fillStyle':
                    this.ctx.fillStyle = value;
                    break;
                case 'glow': {
                    this.ctx.shadowBlur = value[0];
                    this.ctx.shadowColor = value[1];
                    break;
                }

                default:
            }
        });

        return this;
    }

    text(text, x, y) {
        this.ctx.fillText(text, x, y);
        return this;
    }

    multiple(fn, ...params) {
        params.forEach(param => fn(this, param));
        return this;
    }

    conditional(conditions) {
        conditions
            .filter(condition => condition[1])
            .forEach(condition => condition[0](this));
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

        if (this.trackingShape) {
            this.shape.push({
                line: params => {
                    this.ctx.lineTo(...params.slice(2));
                },
                params: [x1, y1, x2, y2],
            });
        }
        this.ctx.stroke();

        return this;
    }

    curve(startX, startY, cpX, cpY, endX, endY) {
        this.ctx.beginPath();

        this.ctx.moveTo(startX, startY);
        this.ctx.quadraticCurveTo(cpX, cpY, endX, endY);

        if (this.trackingShape) {
            this.shape.push({
                curve: params => {
                    this.ctx.quadraticCurveTo(...params.slice(2));
                },
                params: [startX, startY, cpX, cpY, endX, endY],
            });
        }

        this.ctx.stroke();

        return this;
    }

    fill(colour) {
        this.ctx.fillStyle = colour;
        this.ctx.fill();
        return this;
    }

    gradientFill(x1, y1, x2, y2, colour1, colour2) {
        var gradient = this.ctx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, colour1);
        gradient.addColorStop(1, colour2);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
        return this;
    }

    path(paths) {
        this.ctx.beginPath();
        paths.forEach(path => {
            this.ctx.bezierCurveTo(...path);
            if (this.trackingShape) {
                this.shape.push({
                    curve: params => {
                        this.ctx.bezierCurveTo(...params);
                    },
                    params: path,
                });
            }
        });
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

    arcRect() {}

    circle(x, y, r) {
        if (this.relativeXPositioning) {
            x = this.getRelativeXCoordinates(x);
        }

        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);
        this.ctx.stroke();

        return this;
    }

    initCanvas(canvas, width, height, setCanvasDims) {
        if (setCanvasDims) {
            canvas.current.width = width * 3;
            canvas.current.height = height * 3;
            canvas.current.style.width = `${width}px`;
            canvas.current.style.height = `${height}px`;
        }

        this.canvas = canvas;

        this.ctx = canvas.current.getContext('2d');

        this.ctx.scale(3, 3);
    }

    getTrueCoordinates(clientX, clientY, validate) {
        const xTravel = this.canvasWidth - this.xPad * 2;
        const yTravel = this.canvasHeight - this.yPad * 2;
        const canvasBB = this.canvas.current.getBoundingClientRect();
        const canvasTop = canvasBB.top;
        const canvasLeft = canvasBB.left;
        const relativeY = Math.floor(
            yTravel - (clientY - canvasTop - this.yPad)
        );
        const relativeX = Math.floor(clientX - canvasLeft - this.xPad);

        let mappedX = relativeX / xTravel;
        let mappedY = relativeY / yTravel;

        if (validate) {
            [mappedX, mappedY] = [mappedX, mappedY].map(v =>
                validate ? (v >= 1 ? 1 : v <= 0 ? 0 : v) : v
            );
        }
        return [mappedX, mappedY];
    }
}

export default CanvasUtilities;
