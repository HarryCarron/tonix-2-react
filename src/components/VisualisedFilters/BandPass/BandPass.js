import { useRef, useEffect } from 'react';
import CanvasUtilities from './../../../Utilities/CanvasUtilities';
import ArrOnN from './../../../Utilities/Math';
import './BandPass.css';
import './../Filters.css';
import { DragAndDrop } from '../../../Utilities/DragAndDrop';

export default function BandPass({ gain, freq, q, setFilter }) {
    const width = 130;
    const height = 70;
    const xPad = 8;
    const yPad = 8;
    const qControl = useRef();
    const canvas = useRef();
    const canvasUtils = useRef();

    useEffect(() => {
        canvasUtils.current = new CanvasUtilities(
            canvas,
            xPad,
            yPad,
            width,
            height,
            true
        )
            .setStyle({
                lineCap: 'round',
                textAlign: 'center',
                font: 'bold 6px Helvetica',
            })
            .setStyleProfiles({
                gridLine: {
                    lineWidth: 0.1,
                    opacity: 0.1,
                    strokeColor: 'white',
                    lineDash: [0],
                },
                filterHandle: {
                    strokeColor: 'white',
                    lineWidth: 2,
                    opacity: 0.4,
                },
                filterLine: {
                    lineWidth: 2,
                    strokeColor: '#BEBEBE',
                    lineDash: [],
                    fillStyle: 'rgba(190, 190, 190, 0.2)',
                    // glow: [10, 'rgba(225, 225, 225, 0.8)'],
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
        const availableWidth = width - xPad * 2;
        const availableHeight = height - yPad * 2;

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
                ...ArrOnN(18).map(i => {
                    const lineY = yPad + ((height - yPad * 2) / 17) * i;
                    return [xPad, height - lineY, width - xPad, height - lineY];
                }),
                ...ArrOnN(20).map(i => {
                    const lineX = xPad + ((width - yPad * 2) / 19) * i;
                    return [lineX, yPad, lineX, height - yPad];
                })
            )
            .styleProfile('filterLine')
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
            .fill();
    }, [gain, freq, q]);

    return (
        <div className="d-flex-xol">
            <div className="filter-container band-pass w-100">
                <canvas ref={canvas}></canvas>
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
