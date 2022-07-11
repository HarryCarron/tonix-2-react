export class DragAndDrop {
    hostBB;

    buffer = { x: 0, y: 0 };
    pad = { x: 0, y: 0 };

    customDimSet;

    hostDim = {
        height: 0,
        width: 0,
    };

    constructor(host, onDrag) {
        this.host = host;
        this.onDrag = onDrag;

        this.hostDim.height = host.offsetHeight || 0;
        this.hostDim.width = host.offsetWidth || 0;

        this.attachListener(host);
    }

    allowOverHang(mode) {
        this.allOverHang = !!mode;
        return this;
    }

    setBufffer(x, y) {
        this.buffer.x = x;
        this.buffer.y = y;
        return this;
    }

    setPad(x, y) {
        this.pad.x = x;
        this.pad.y = y;
        return this;
    }

    setCustomDimSet(customDimSet) {
        const customHDims = customDimSet(this.host);
        this.hostDim.height = customHDims.height;
        this.hostDim.width = customHDims.width;

        return this;
    }

    mouseMoving(e) {
        const coOrdinates = this.calculate(e);
        this.onDrag(coOrdinates);
    }

    calculate({ clientX, clientY }) {
        const hostTop = this.hostBB.top;
        const hostLeft = this.hostBB.left;
        const height = this.hostDim.height - this.pad.y;
        const relativeY = Math.floor(height - (clientY - hostTop));
        const relativeX = Math.floor(clientX - hostLeft);

        // let mappedX =
        //     relativeX / (this.hostDim.width - this.buffer.x / 2 - this.pad.x);
        // let mappedY =
        //     relativeY / (this.hostDim.height - this.buffer.y / 2 - this.pad.y);
        let mappedX = relativeX / this.hostDim.width;
        let mappedY = relativeY / this.hostDim.height;

        console.log(mappedX, mappedY);

        return [mappedX, mappedY].map(v => (v >= 1 ? 1 : v <= 0 ? 0 : v));
    }

    attachListener(host) {
        host.addEventListener('mousedown', () => this.prime(host));
    }

    prime(host) {
        this.hostBB = host.getBoundingClientRect();

        const onMouseMove = e => this.onDrag(this.calculate(e));

        const onMouseUp = () => {
            host.removeEventListener('mousemove', onMouseMove);
            host.removeEventListener('mouseup', onMouseUp);
        };

        if (this.allowOverHang) {
            host = window;
        }

        host.addEventListener('mousemove', onMouseMove);
        host.addEventListener('mouseup', onMouseUp);
    }
}
