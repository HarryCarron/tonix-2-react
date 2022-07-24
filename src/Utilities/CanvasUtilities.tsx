import {
    TrackedShapeDefinition,
    TrackedShapeActionType,
} from './../types/CanvasUtilities';

class CanvasUtilities {
    private xPad: number = 0;
    private yPad: number = 0;
    private canvasWidth: number = 0;
    private canvasHeight: number = 0;
    private canvas: HTMLCanvasElement;
    private ctx: any = null;

    private styleProfiles = {};

    private shape: TrackedShapeDefinition[] = [];
    private trackingShape: boolean = false;

    constructor(
        canvas: HTMLCanvasElement,
        xPad: number,
        yPad: number,
        width: number,
        height: number,
        setCanvasDims: boolean
    ) {
        this.xPad = xPad;
        this.yPad = yPad;
        this.initCanvas(canvas, width, height, setCanvasDims);
        this.canvasWidth = width;
        this.canvasHeight = height;
        return this;
    }

    public clear(): this {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        return this;
    }

    public setStyleProfiles(profiles = {}): this {
        this.styleProfiles = profiles;
        return this;
    }

    public trackShape(): this {
        this.trackingShape = true;
        return this;
    }

    public stopTrackingShape(): this {
        this.trackingShape = false;
        return this;
    }

    public drawShape(clear: boolean, close: boolean) {
        this.ctx.beginPath();

        let startingPoint: [number, number];

        this.shape.forEach((def, i) => {
            if (!i) {
                startingPoint = def.params.slice(0, 2) as [number, number];
                this.ctx.moveTo(...startingPoint);
            }

            def.action(def.params);
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

    public styleProfile(profileKey) {
        if (this.styleProfiles[profileKey]) {
            this.setStyle(this.styleProfiles[profileKey]);
        } else {
            console.error(`${profileKey} is not a recognised profile key!`);
        }
        return this;
    }

    public setStyle(styles): this {
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

    public text(text, x, y): this {
        this.ctx.fillText(text, x, y);
        return this;
    }

    public multiple(fn, ...params): this {
        params.forEach(param => fn(this, param));
        return this;
    }

    public conditional(conditions): this {
        conditions
            .filter(condition => condition[1])
            .forEach(condition => condition[0](this));
        return this;
    }

    public line(x1: number, y1: number, x2: number, y2: number): this {
        this.ctx.beginPath();

        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);

        if (this.trackingShape) {
            this.shape.push({
                action: params => {
                    this.ctx.lineTo(...params.slice(2));
                },
                actionType: TrackedShapeActionType.line,
                params: [x1, y1, x2, y2],
            });
        }
        this.ctx.stroke();

        return this;
    }

    public curve(
        startX: number,
        startY: number,
        cpX: number,
        cpY: number,
        endX: number,
        endY: number
    ): this {
        this.ctx.beginPath();

        this.ctx.moveTo(startX, startY);
        this.ctx.quadraticCurveTo(cpX, cpY, endX, endY);

        if (this.trackingShape) {
            this.shape.push({
                action: params => {
                    this.ctx.quadraticCurveTo(...params.slice(2));
                },
                actionType: TrackedShapeActionType.curve,
                params: [startX, startY, cpX, cpY, endX, endY],
            });
        }

        this.ctx.stroke();

        return this;
    }

    public fill(colour: string): this {
        this.ctx.fillStyle = colour;
        this.ctx.fill();
        return this;
    }

    public gradientFill(
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        colour1: string,
        colour2: string
    ): this {
        var gradient = this.ctx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, colour1);
        gradient.addColorStop(1, colour2);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
        return this;
    }

    public path(paths: [number[]]): this {
        this.ctx.beginPath();
        paths.forEach(path => {
            this.ctx.bezierCurveTo(...path);
            if (this.trackingShape) {
                this.shape.push({
                    action: params => {
                        this.ctx.bezierCurveTo(...params);
                    },
                    actionType: TrackedShapeActionType.curve,
                    params: path,
                });
            }
        });
        this.ctx.stroke();

        return this;
    }

    public rect(
        x: number,
        y: number,
        width: number,
        height: number,
        fill: boolean
    ): this {
        this.ctx.beginPath();
        if (fill) {
            this.ctx.fillRect(x, y, width, height);
            this.ctx.strokeRect(x, y, width, height);
        } else {
            this.ctx.rect(x, y, width, height);
        }
        this.ctx.stroke();

        return this;
    }

    public circle(x: number, y: number, r: number): this {
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);
        this.ctx.stroke();

        return this;
    }

    private initCanvas(canvas, width, height, setCanvasDims): void {
        if (setCanvasDims) {
            canvas.width = width * 3;
            canvas.height = height * 3;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
        }

        this.canvas = canvas;

        this.ctx = canvas.current.getContext('2d');

        this.ctx.scale(3, 3);
    }

    /**
     * todo: Decouple co-ord logic. Move to implementing codes' scope.
     * @param clientX
     * @param clientY
     * @param validate
     * @returns
     */
    public getTrueCoordinates(
        clientX,
        clientY,
        validate
    ): [number, number] | undefined {
        const xTravel = this.canvasWidth - this.xPad * 2;
        const yTravel = this.canvasHeight - this.yPad * 2;
        const canvasBB: DOMRect | undefined =
            this.canvas?.getBoundingClientRect();
        if (canvasBB) {
            const canvasTop = canvasBB?.top;
            const canvasLeft = canvasBB?.left;
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
}

export default CanvasUtilities;
