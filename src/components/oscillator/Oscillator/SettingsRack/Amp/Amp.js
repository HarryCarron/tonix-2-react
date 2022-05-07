import React, { useEffect, useRef, useCallback, useState } from 'react';
import CanvasUtilities from '../../../../../Utilities/CanvasUtilities';
import GlobalEventHandlers from '../../../../../Utilities/GlobalEventHandlers';
import './Amp.css';

export function Amp(props) {
    const xPad = 35;
    const yPad = 20;

    let previousValue = 0;

    const [amp, setAmp] = useState({
        attack: 0.1,
        attackCurve: 0,
        decay: 0.2,
        decayCurve: 0,
        sustain: 0.5,
        sustainWidth: 0.2,
        release: 0.3,
        releaseCurve: 0,
    });

    const utils = useRef({ globalMouseMove: new GlobalEventHandlers() });

    const ampValues = useRef({
        height: props.dims.height,
        floor: props.dims.height - yPad,
        totalXTravel: props.dims.width - xPad * 2,
        totalYTravel: props.dims.height - yPad * 2,
        sustainWidth: 0,
        sustainHeight:
            props.dims.height -
            yPad -
            amp.sustain * (props.dims.height - yPad * 2),
    });

    const canvas = useRef();

    useEffect(() => {
        utils.current.canvas = new CanvasUtilities(
            canvas,
            xPad,
            yPad,
            props.dims.width,
            props.dims.height,
            true
        )
            .setStyle({
                lineCap: 'round',
                textAlign: 'center',
                font: 'bold 7px Helvetica',
            })
            .setStyleProfiles({
                ampLine: {
                    lineWidth: 2,
                    strokeColor: '#fe5f55',
                    lineDash: [0],
                },
                ampLineFill: { fillColor: '#FE5F55', opacity: 0.4 },
                ampHandle: {
                    lineWidth: 2,
                    strokeColor: '#FFFD47',
                    lineDash: [],
                },
                baseLine: {
                    lineWidth: 2,
                    strokeColor: '#97979d',
                    lineDash: [0],
                },
                valueGuideLine: {
                    lineWidth: 1,
                    strokeColor: '#707070',
                    lineDash: [2, 3],
                },
                valueText: { fillStyle: '#C3C3CE' },
            });
    }, [props.dims.height, props.dims.width]);

    const drawAmp = useCallback(() => {
        ampValues.current.sustainHeight =
            ampValues.current.floor -
            amp.sustain * (props.dims.height - yPad * 2);

        const getXpositions = () => {
            return [amp.attack, amp.decay, amp.sustainWidth, amp.release].map(
                (_, i, o) =>
                    xPad +
                    ampValues.current.totalXTravel *
                        o.slice(0, i + 1).reduce((a, b) => a + b)
            );
        };

        const getCurveName = () =>
            [amp.attackCurve, amp.decayCurve, amp.releaseCurve].map(curve => {
                if (curve === 0) {
                    return 'LIN';
                }
                if (curve === 1) {
                    return 'EXP';
                }
                return 'COS';
            });

        const [attackX, decayX, sustainWidthX, releaseX] = getXpositions();
        const [attackCurveName, decayCurveName, releaseCurveName] =
            getCurveName();

        const sustainHeight = ampValues.current.sustainHeight;
        const floor = ampValues.current.floor;
        const canvas = utils.current.canvas;

        // prettier-ignore
        canvas.clear()
            .styleProfile('baseLine')
            .multiple(
                (ctx, params) => ctx.line(...params),
                [xPad, floor, props.dims.width - xPad, floor],
                [xPad, floor, xPad, yPad]
            )

            .styleProfile('valueGuideLine')
            .multiple(
                (ctx, params) => ctx.line(...params),
                [attackX, yPad, attackX, floor],
                [decayX, sustainHeight, decayX, yPad],
                [xPad, sustainHeight, decayX, sustainHeight]
            )

            .styleProfile('valueText')
            .multiple(
                (ctx, params) => ctx.text(...params),
                [`A: ${amp.attack.toFixed(2)} ${attackCurveName}`, attackX, floor + 12],
                [`D: ${amp.decay.toFixed(2)} ${decayCurveName}`, decayX, yPad - 6],
                [`S: ${amp.sustain.toFixed(1)}`, xPad - 18, sustainHeight],
                [`R: ${amp.release.toFixed(2)} ${releaseCurveName}`, releaseX, floor + 12]
            )

            .styleProfile('ampLine')
            .conditional([
                [ctx => ctx.line(xPad, floor, attackX, yPad), amp.attackCurve === 0],
                [ctx => ctx.curve(xPad, floor, attackX, floor, attackX, yPad), amp.attackCurve === 1],
                [ctx => ctx.curve(xPad, floor, xPad, yPad, attackX, yPad), amp.attackCurve === 2],
                [ctx => ctx.line(attackX, yPad, decayX, sustainHeight), amp.decayCurve === 0],
                [ctx => ctx.curve(attackX, yPad, attackX, sustainHeight, decayX, sustainHeight), amp.decayCurve === 1],
                [ctx =>ctx.curve(attackX, yPad, decayX, yPad, decayX, sustainHeight), amp.decayCurve === 2],
                [ctx => ctx.line(sustainWidthX, sustainHeight, releaseX, floor), amp.releaseCurve === 0],
                [ctx => ctx.curve(sustainWidthX, sustainHeight, sustainWidthX, floor, releaseX, floor), amp.releaseCurve === 1],
                [ctx => ctx.curve(sustainWidthX, sustainHeight, releaseX, sustainHeight, releaseX, floor), amp.releaseCurve === 2],
            ])
            .line(decayX, sustainHeight, sustainWidthX, sustainHeight)

            .styleProfile('ampHandle')
            .multiple(
                (ctx, params) => ctx.circle(...params),
                [attackX, yPad, 2.5],
                [decayX, sustainHeight, 2.5],
                [sustainWidthX, sustainHeight, 2.5],
                [releaseX, floor, 2.5]
            );
    }, [
        amp.attack,
        amp.attackCurve,
        amp.decay,
        amp.decayCurve,
        amp.release,
        amp.releaseCurve,
        amp.sustain,
        amp.sustainWidth,
        props.dims.width,
        props.dims.height,
    ]);

    useEffect(_ => drawAmp(), [drawAmp]);

    const validateValue = v => {
        if (v >= 1) {
            return 1;
        }
        if (v <= 0) {
            return 0;
        }

        return v;
    };

    const widthValid = amp => {
        return (
            [amp.attack, amp.decay, amp.sustainWidth, amp.release].reduce(
                (a, b) => a + b
            ) < 1
        );
    };

    const handleClick = ({ clientX, clientY }, i) => {
        if (!(clientX && clientY)) {
            return;
        }
        let [x, y] = utils.current.canvas.getTrueCoordinates(clientX, clientY);

        switch (i) {
            case 0: {
                let attack = validateValue(x);
                setAmp(state => {
                    if (widthValid({ ...state, attack })) {
                        return { ...state, attack };
                    }
                    return state;
                });
                break;
            }
            case 1: {
                const decay = validateValue(x - amp.attack);
                const sustain = validateValue(y, false);
                setAmp(state => {
                    if (widthValid({ ...state, decay })) {
                        return { ...state, decay };
                    }
                    return state;
                });
                setAmp(state => ({ ...state, sustain }));
                break;
            }
            case 2: {
                const sustainWidth = validateValue(
                    x - (amp.attack + amp.decay)
                );
                const sustain = validateValue(y);

                setAmp(state => {
                    if (widthValid({ ...state, sustainWidth })) {
                        return { ...state, sustainWidth };
                    }
                    return state;
                });

                setAmp(state => ({ ...state, sustain }));

                break;
            }
            case 3: {
                const release = validateValue(
                    x - (amp.attack + amp.decay + amp.sustainWidth)
                );
                setAmp(state => {
                    if (widthValid({ ...state, release })) {
                        return { ...state, release };
                    }
                    return state;
                });
                break;
            }
            default:
                return;
        }
    };

    const onHandleDrag = (e, i) => {
        handleClick(e, i);
        utils.current.globalMouseMove.initiate(e => handleClick(e, i));
    };

    const ampClicked = i => {
        let currentCurve;
        let set;
        switch (i) {
            case 0: {
                currentCurve = amp.attackCurve;
                set = () => setAmp({ ...amp, attackCurve: currentCurve });
                break;
            }
            case 1: {
                currentCurve = amp.decayCurve;
                set = () => setAmp({ ...amp, decayCurve: currentCurve });
                break;
            }
            case 3: {
                currentCurve = amp.releaseCurve;
                set = () => setAmp({ ...amp, releaseCurve: currentCurve });
                break;
            }
            default:
                break;
        }

        if (currentCurve === 2) {
            currentCurve = 0;
        } else {
            currentCurve = currentCurve + 1;
        }

        set();
    };

    const get = id => {
        const sustainHeight = ampValues.current.sustainHeight;
        const all = [amp.attack, amp.decay, amp.sustainWidth, amp.release];
        const pointY = [
            yPad,
            sustainHeight,
            sustainHeight,
            ampValues.current.floor,
        ];

        const x =
            xPad +
            all.slice(0, id).reduce((a, b) => a + b, 0) *
                ampValues.current.totalXTravel;
        const width = all[id] * ampValues.current.totalXTravel;

        return {
            x,
            width,
            handle: {
                x: x + width,
                y: pointY[id],
            },
        };
    };

    return (
        <div className="wh-100 canvas-layer">
            <canvas ref={canvas}></canvas>
            <div className="flex-1 interaction-layer d-flex">
                <svg
                    className="interaction-layer"
                    height={props.dims.height}
                    width={props.dims.width}
                >
                    {[0, 1, 2, 3].map(i =>
                        interactionPanel(get(i), i, () => ampClicked(i))
                    )}

                    {[0, 1, 2, 3].map(i =>
                        interactionHandle(get(i), i, e => onHandleDrag(e, i))
                    )}
                </svg>
            </div>
        </div>
    );
}

const interactionPanel = ({ x, width }, i, onAmpClick) => (
    <rect key={i} onClick={onAmpClick} x={x} width={width} y="0" />
);

const interactionHandle = ({ handle: { x, y } }, i, onHandleDrag) => (
    <circle key={i} onMouseDown={onHandleDrag} cx={x} cy={y} r="5" />
);

export default Amp;
