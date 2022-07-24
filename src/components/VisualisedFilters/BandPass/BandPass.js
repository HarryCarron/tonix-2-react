import { useRef, useEffect } from 'react';
import CanvasUtilities from './../../../Utilities/CanvasUtilities';
import ArrOnN from './../../../Utilities/Math';
import './BandPass.css';
import './../Filters.css';
import { DragAndDrop } from '../../../Utilities/DragAndDrop';

export default function BandPass({ gain, freq, q, setFilter }) {
    const xPad = 12;
    const yPad = 12;
    const qControl = useRef();
    const canvas = useRef();
    const canvasUtils = useRef();
    const container = useRef();

    useEffect(() => {
        canvasUtils.current = new CanvasUtilities(
            canvas.current,
            xPad,
            yPad,
            container.current.offsetWidth,
            container.current.offsetHeight,
            true
        )

            .setStyle({
                lineCap: 'round',
                textAlign: 'center',
                font: 'bold 6px Helvetica',
            })
            .setStyleProfiles({
                gridLine: {
                    lineWidth: 1,
                    opacity: 0.3,
                    strokeColor: 'rgba(255, 95, 95, 0.2)',
                    lineDash: [0],
                },
                filterHandle: {
                    strokeColor: 'white',
                    lineWidth: 2,
                    opacity: 0.4,
                },
                filterLine: {
                    lineWidth: 2,
                    strokeColor: '#ff5f5f',
                    lineDash: [0],
                },
            });
    }, []);

    useEffect(() => {
        new DragAndDrop(canvas.current, data =>
            setFilter({
                gain: data[1],
                freq: data[0],
            })
        )
            .setPad(xPad, yPad)
            .allowOverHang(true);
    }, [setFilter]);

    useEffect(() => {
        new DragAndDrop(qControl.current, res =>
            setFilter({
                q: res[1],
            })
        );
    }, [setFilter]);

    useEffect(() => {
        const availableWidth = container.current.offsetWidth - xPad * 2;
        const availableHeight = container.current.offsetHeight - yPad * 2;

        const freqAt = availableWidth * freq + xPad;
        const gainAt = availableHeight - availableHeight * gain + yPad;

        const qcp = (availableWidth / 2) * q;
        let leftQ = freqAt - qcp;

        if (leftQ <= yPad) {
            leftQ = yPad;
        }
        let rightQ = freqAt + qcp;

        if (rightQ >= yPad + availableWidth) {
            rightQ = yPad + availableWidth;
        }

        const curve1StartX = xPad;
        const curve1StartY = yPad + availableHeight;

        const curve1CPX = leftQ;
        const curve1CPY = yPad + availableHeight;

        const curve1EndX = leftQ;
        const curve1EndY =
            yPad + availableHeight - (gain * availableHeight) / 2;

        const curve2StartX = leftQ;
        const curve2StartY =
            yPad + availableHeight - (gain * availableHeight) / 2;

        const curve2CPX = leftQ;
        const curve2CPY = gainAt;

        const curve2EndX = freqAt;
        const curve2EndY = gainAt;

        const curve3StartX = freqAt;
        const curve3StartY = gainAt;

        const curve3CPX = rightQ;
        const curve3CPY = gainAt;

        const curve3EndX = rightQ;
        const curve3EndY =
            yPad + availableHeight - (gain * availableHeight) / 2;

        const curve4StartX = rightQ;
        const curve4StartY =
            yPad + availableHeight - (gain * availableHeight) / 2;

        const curve4CPX = rightQ;
        const curve4CPY = yPad + availableHeight;

        const curve4EndX = xPad + availableWidth;
        const curve4EndY = yPad + availableHeight;

        canvasUtils.current
            .clear()
            .styleProfile('gridLine')
            .multiple(
                (ctx, params) => ctx.line(...params),
                ...ArrOnN(26).map(i => {
                    const height = container.current.offsetHeight;
                    const width = container.current.offsetWidth;
                    const lineY = yPad + ((height - yPad * 2) / 25) * i;
                    return [xPad, height - lineY, width - xPad, height - lineY];
                }),
                ...ArrOnN(40).map(i => {
                    const height = container.current.offsetHeight;
                    const width = container.current.offsetWidth;
                    const lineX = xPad + ((width - yPad * 2) / 39) * i;
                    return [lineX, yPad, lineX, height - yPad];
                })
            )
            .styleProfile('filterLine')
            .trackShape()
            .path([
                [
                    curve1StartX,
                    curve1StartY,
                    curve1CPX,
                    curve1CPY,
                    curve1EndX,
                    curve1EndY,
                ],
                [
                    curve2StartX,
                    curve2StartY,
                    curve2CPX,
                    curve2CPY,
                    curve2EndX,
                    curve2EndY,
                ],
                [
                    curve3StartX,
                    curve3StartY,
                    curve3CPX,
                    curve3CPY,
                    curve3EndX,
                    curve3EndY,
                ],
                [
                    curve4StartX,
                    curve4StartY,
                    curve4CPX,
                    curve4CPY,
                    curve4EndX,
                    curve4EndY,
                ],
            ])
            .stopTrackingShape()
            .drawShape(true, true)
            .gradientFill(
                175,
                0,
                175,
                130,
                'rgba(255, 95, 95, 0.3)',
                'rgba(255, 95, 95, 0)'
            )
            .fill();
    }, [gain, freq, q]);

    return (
        <div className="d-flex-col h-100 h-100">
            <div className="flex-1 band-pass w-100" ref={container}>
                <canvas height="0" width="0" ref={canvas}></canvas>
            </div>
            <div className="d-flex filter-tools space-around">
                <div className="filter-value bold d-flex center-child-xy">
                    BAND
                </div>
                <div className="filter-value d-flex center-child-xy">
                    FREQ:{freq.toFixed(2)}
                </div>
                <div className="filter-value d-flex center-child-xy">
                    GAIN:{gain.toFixed(2)}
                </div>
                <div
                    ref={qControl}
                    className="filter-value d-flex center-child-xy"
                >
                    Q:{q.toFixed(2)}
                </div>
            </div>
        </div>
    );
}
