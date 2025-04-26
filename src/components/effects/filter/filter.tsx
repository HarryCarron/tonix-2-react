import { useRef, useEffect, useState, useCallback } from 'react';
import CanvasUtilities from '../../../utilities/canvas-utilities';
import './Filter.css';
import { DragAndDrop } from '../../../utilities/drag-and-drop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Knob from '../../shared/rotary-control/rotary-control';

export default function Filter() {
    const xPad = 12;
    const yPad = 12;
    const qControl = useRef();
    const canvas = useRef<HTMLCanvasElement | null>(null);
    const canvasUtils = useRef<CanvasUtilities | undefined>();
    const container = useRef<HTMLDivElement | null>(null);

    const [filterValues, setFilterValues] = useState({
        gain: 0.5,
        freq: 0.5,
        q: 0.5,
    });

    const setFreq = useCallback((freq: number) => {
        setFilterValues(state => ({
            ...state,
            freq,
        }));
    }, []);

    const setGain = useCallback((gain: number) => {
        setFilterValues(state => ({
            ...state,
            gain,
        }));
    }, []);

    const setQ = useCallback((q: number) => {
        setFilterValues(state => ({
            ...state,
            q,
        }));
    }, []);

    useEffect(() => {
        canvasUtils.current = new CanvasUtilities(
            canvas,
            xPad,
            yPad,
            container.current!.offsetWidth,
            container.current!.offsetHeight,
            true
        )

            .setStyle({
                lineCap: 'round',
                textAlign: 'center',
                font: 'bold 6px Helvetica',
            })
            .setStyleProfiles({
                filterHandle: {
                    strokeColor: 'white',
                    lineWidth: 2,
                    opacity: 0.4,
                },
                filterLine: {
                    lineWidth: 2,
                    strokeColor: 'white',
                    lineDash: [0],
                },
            });
    }, []);

    useEffect(() => {
        new DragAndDrop(canvas.current!)
            // .allowOverHang(true)
            .setPad(xPad, yPad)
            .onDrag(
            ([freq, gain]: [number, number]) => {
                setFilterValues(state => {
                    return {
                        gain,
                        freq,
                        q: state.q,
                    };
                })
            }
        );
            
            
            
        // .allowOverHang(true);
    }, [setFilterValues]);

    // useEffect(() => {
    //     new DragAndDrop(qControl.current, res =>
    //         setFilter({
    //             q: res[1],
    //         })
    //     );
    // }, [setFilter]);

    useEffect(() => {
        const availableWidth = container.current!.offsetWidth - xPad * 2;
        const availableHeight = container.current!.offsetHeight - yPad * 2;

        const freqAt = availableWidth * filterValues.freq + xPad;
        const gainAt =
            availableHeight - availableHeight * filterValues.gain + yPad;

        const qcp = (availableWidth / 2) * filterValues.q;
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
            yPad + availableHeight - (filterValues.gain * availableHeight) / 2;

        const curve2StartX = leftQ;
        const curve2StartY =
            yPad + availableHeight - (filterValues.gain * availableHeight) / 2;

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
            yPad + availableHeight - (filterValues.gain * availableHeight) / 2;

        const curve4StartX = rightQ;
        const curve4StartY =
            yPad + availableHeight - (filterValues.gain * availableHeight) / 2;

        const curve4CPX = rightQ;
        const curve4CPY = yPad + availableHeight;

        const curve4EndX = xPad + availableWidth;
        const curve4EndY = yPad + availableHeight;

        canvasUtils.current! // todo #19
            .clear()
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
            .drawShape(true, true);
        // .gradientFill(
        //     175,
        //     0,
        //     175,
        //     130,
        //     'rgba(255, 255,255, 0.2)',
        //     'rgba(255, 255,255, 0.2)'
        // );
        // .fill();
    }, [filterValues]);

    return (
        <div className="d-flex-col filter">
            <div className="band-pass w-100" ref={container}>
                <canvas height="0" width="0" ref={canvas}></canvas>
            </div>

            <div className="controls-container d-flex">
                <div className="flex-1 control-container">
                    <div className="d-flex center-child-xy header-item">
                        Type
                    </div>
                    <select className="input-container">
                        <option value="LP">LP</option>
                        <option value="HP">HP</option>
                        <option selected value="BP">
                            BP
                        </option>
                    </select>
                </div>
                <div className="flex-1 control-container rotary-container">
                    <div className="d-flex center-child-xy header-item">
                        Freq
                    </div>
                    <Knob
                        arcWidth={3}
                        color={'white'}
                        size={20}
                        value={filterValues.freq}
                    />
                </div>
                <div className="flex-1 control-container rotary-container">
                    <div className="d-flex center-child-xy header-item">
                        Gain
                    </div>
                    <Knob
                        arcWidth={3}
                        color={'white'}
                        value={filterValues.gain}
                        size={20}
                    />
                </div>
                <div className="flex-1 control-container rotary-container">
                    <div className="d-flex center-child-xy header-item">Q</div>
                    <Knob
                        arcWidth={3}
                        color={'white'}
                        size={20}
                        value={filterValues.q}
                    />
                </div>
            </div>
        </div>
    );
}
