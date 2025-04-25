import { Coordinates } from "../shared/types/coordinates";

export class DragAndDrop<T extends EventTarget> {

    private _hostBB: DOMRect | undefined;

    private readonly _buffer = { x: 0, y: 0 };

    private readonly _pad = { x: 0, y: 0 };

    // private _allowOverHang: boolean = false; todo #8

    private _onDrag: ((data: Coordinates | void) => void) | undefined;

    private _hostBoundingBox: DOMRect | undefined;

    constructor(private _host: T) {
        this._attachListener(_host);
    }

    getDomRect(setter: (host: T) => DOMRect): this {
        this._hostBoundingBox = setter(this._host);

        return this;
    }

    onDrag(onDrag: (data: Coordinates | void) => void): this {
        this._onDrag = onDrag;

        return this;
    }

    // allowOverHang(mode: boolean): this { todo #8
    //     this._allowOverHang = mode;
    //     return this;
    // }

    setBufffer(x: number, y: number): this {
        this._buffer.x = x;
        this._buffer.y = y;
        return this;
    }

    setPad(x: number, y: number): this {
        this._pad.x = x;
        this._pad.y = y;
        return this;
    }

    private _calculate(e: Event): Coordinates | void {

        if (e instanceof MouseEvent) {
            const {clientX, clientY} = e;

            const hostTop = this._hostBB!.top;
            const hostLeft = this._hostBB!.left;
            const height = this._hostBoundingBox!.height - this._pad.y * 2;
            const width = this._hostBoundingBox!.width - this._pad.x * 2;
            const relativeY = Math.floor(height - (clientY - hostTop));
            const relativeX = Math.floor(clientX - hostLeft);
    
            let mappedX = relativeX / this._hostBoundingBox!.width;
            let mappedY = relativeY / height;
    
            return [mappedX, mappedY].map(v =>
                v >= 1 ? 1 : v <= 0 ? 0 : v
            ) as Coordinates;
        }

    }

    private _attachListener(host: T) {
        host.addEventListener('mousedown', () => this._prime(host));
    }

    private _prime(host: T): void {
        const onMouseMove: EventListener = (e: Event) => {
            this._onDrag!(this._calculate(e));
        }

        const onMouseUp = () => {
            host.removeEventListener('mousemove', onMouseMove);
            host.removeEventListener('mouseup', onMouseUp);
        };

        // if (this._allowOverHang) { todo #8
        //     this._host = window;
        // }
        
        host.addEventListener('mousemove', onMouseMove);
        host.addEventListener('mouseup', onMouseUp);
    }
}
