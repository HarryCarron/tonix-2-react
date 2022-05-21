import { useRef, useEffect } from 'react';
import GlobalEventHandlers from './../../../Utilities/GlobalEventHandlers';
import CanvasUtilities from './../../../Utilities/CanvasUtilities';
import ArrOnN from './../../../Utilities/Math';
import './BandPass.css';
import './../Filters.css';

export default function BandPass({ gain, freq, q, setFilter }) {
    const width = 186;
    const height = 80;
    const xPad = 8;
    const yPad = 8;
    const canvas = useRef();
    const utils = useRef({ globalMouseMove: new GlobalEventHandlers() });

    useEffect(() => {
        utils.current.canvas = new CanvasUtilities(
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
                    opacity: 0.5,
                    strokeColor: 'white',
                    lineDash: [0],
                },
                filterHandle: {
                    strokeColor: '#FFFD47',
                    lineWidth: 2,
                    opacity: 0.4,
                },
                filterLine: {
                    lineWidth: 2,
                    strokeColor: '#fe5f55',
                    lineDash: [],
                },
                guide: {
                    lineWidth: 1,
                    strokeColor: 'blue',
                    lineDash: [],
                },
                axisText: { fillStyle: '#C3C3CE' },
            });
    }, []);

    const mouseDown = e => {
        manipulateFiler(e);
        utils.current.globalMouseMove.initiate(e => manipulateFiler(e));
    };

    const mouseDownValues = e => {
        manipulateValue(e);
        utils.current.globalMouseMove.initiate(e => manipulateValue(e));
    };

    const manipulateValue = ({ clientX, clientY }) => {
        let [_, q] = utils.current.canvas.getTrueCoordinates(
            clientX,
            clientY,
            true
        );

        setFilter({
            q,
        });
    };
    const manipulateFiler = ({ clientX, clientY }) => {
        let [freq, gain] = utils.current.canvas.getTrueCoordinates(
            clientX,
            clientY,
            true
        );

        setFilter({
            freq,
            gain,
        });
    };

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

        utils.current.canvas
            .clear()
            .styleProfile('gridLine')
            .multiple(
                (ctx, params) => ctx.line(...params),
                ...ArrOnN(11).map(i => {
                    const lineY = yPad + ((height - yPad * 2) / 10) * i;
                    return [xPad, height - lineY, width - xPad, height - lineY];
                }),
                ...ArrOnN(25).map(i => {
                    const lineX = xPad + ((width - yPad * 2) / 24) * i;
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
            .fill()
            .styleProfile('filterHandle')

            .circle(freqAt, gainAt, 3);
    }, [gain, freq, q]);

    return (
        <>
            <div className="filter-container band-pass w-100">
                <canvas ref={canvas} onMouseDown={mouseDown}></canvas>
            </div>
            <div className="filter-tools d-flex space-around">
                <div class="filter-value bold d-flex center-child-y">BAND</div>
                <div class="filter-value d-flex center-child-y">
                    FREQ:{freq.toFixed(2)}
                </div>
                <div class="filter-value d-flex center-child-y">
                    GAIN:{gain.toFixed(2)}
                </div>
                <div
                    class="filter-value d-flex center-child-y"
                    onMouseDown={mouseDownValues}
                >
                    Q:{q.toFixed(2)}
                </div>
            </div>
        </>
    );
}
