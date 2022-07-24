import React, {
    useEffect,
    useRef,
    useCallback,
    useState,
    useLayoutEffect,
} from 'react';
import CanvasUtilities from '../../../../../Utilities/CanvasUtilities';
import GlobalEventHandlers from '../../../../../Utilities/GlobalEventHandlers';
import './Amp.css';

export function Amp() {
    const xPad = 15;
    const yPad = 10;

    const [_, viewReady] = useState(false);

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

    const [attackCurveName, decayCurveName, releaseCurveName] = getCurveName();

    const ampValues = useRef({
        height: 0,
        width: 0,
        floor: 0,
        totalXTravel: 0,
        totalYTravel: 0,
        sustainWidth: 0,
        sustainHeight: 0,
    });

    const canvas = useRef();
    const container = useRef();

    useLayoutEffect(() => {
        if (container.current) {
            ampValues.current.totalXTravel =
                container.current.offsetWidth - xPad * 2;
            ampValues.current.totalYTravel =
                container.current.offsetHeight - yPad * 2;

            ampValues.current.floor = container.current.offsetHeight - yPad;

            ampValues.current.height = container.current.offsetHeight;
            ampValues.current.width = container.current.offsetWidth;

            viewReady();
        }
    }, []);

    useEffect(() => {
        utils.current.canvas = new CanvasUtilities(
            canvas,
            xPad,
            yPad,
            container.current.offsetWidth,
            container.current.offsetHeight,
            true
        )
            .setStyle({
                lineCap: 'round',
                textAlign: 'center',
                font: 'bold 7px Helvetica',
            })
            .setStyleProfiles({
                ampGuide: {
                    lineWidth: 1,
                    strokeColor: 'rgba(255, 95, 95, 0.5)',
                    lineDash: [2, 3],
                },
                ampLine: {
                    lineWidth: 2,
                    strokeColor: '#ff5f5f',
                    lineDash: [0],
                },
                ampLineFill: { fillColor: '#FE5F55', opacity: 0.4 },
                ampHandle: {
                    lineWidth: 2,
                    strokeColor: '#ff5f5f',
                    fillColor: '#FFFD47',
                    lineDash: [],
                },
                baseLine: {
                    lineWidth: 2,
                    strokeColor: 'rgba(255, 95, 95, 0.3)',
                    lineDash: [0],
                },
                valueGuideLine: {
                    lineWidth: 1,
                    strokeColor: '#707070',
                    lineDash: [2, 3],
                },
                valueText: { fillStyle: '#C3C3CE' },
            });
    }, []);

    const drawAmp = useCallback(() => {
        ampValues.current.sustainHeight =
            ampValues.current.floor -
            amp.sustain * (ampValues.current.height - yPad * 2);
        const getXpositions = () => {
            return [amp.attack, amp.decay, amp.sustainWidth, amp.release].map(
                (_, i, o) =>
                    xPad +
                    ampValues.current.totalXTravel *
                        o.slice(0, i + 1).reduce((a, b) => a + b)
            );
        };
        const [attackX, decayX, sustainWidthX, releaseX] = getXpositions();
        const sustainHeight = ampValues.current.sustainHeight;
        const floor = ampValues.current.floor;
        const canvas = utils.current.canvas;
        // prettier-ignore
        canvas.clear()
            .styleProfile('baseLine')
            .multiple(
                (ctx, params) => ctx.line(...params),
                [xPad, floor, ampValues.current.width - xPad, floor],
                [xPad, floor, xPad, yPad]
            )
            .styleProfile('ampGuide')
            .multiple(
                (ctx, params) => ctx.line(...params),
                [attackX, floor, attackX, yPad],
                [decayX, floor, decayX, yPad],
                [sustainWidthX, floor, sustainWidthX, yPad],
                [releaseX, floor, releaseX, yPad],
            )
            .styleProfile('ampLine')
            .trackShape()
            .conditional([
                // attack
                [ctx => ctx.line(xPad, floor, attackX, yPad), amp.attackCurve === 0],
                [ctx => ctx.curve(xPad, floor, attackX, floor, attackX, yPad), amp.attackCurve === 1],
                [ctx => ctx.curve(xPad, floor, xPad, yPad, attackX, yPad), amp.attackCurve === 2],
                // decay
                [ctx => ctx.line(attackX, yPad, decayX, sustainHeight), amp.decayCurve === 0],
                [ctx => ctx.curve(attackX, yPad, attackX, sustainHeight, decayX, sustainHeight), amp.decayCurve === 1],
                [ctx => ctx.curve(attackX, yPad, decayX, yPad, decayX, sustainHeight), amp.decayCurve === 2],
                // sustain
                [ctx => ctx.line(decayX, sustainHeight, sustainWidthX, sustainHeight), true],
                // release
                [ctx => ctx.line(sustainWidthX, sustainHeight, releaseX, floor), amp.releaseCurve === 0],
                [ctx => ctx.curve(sustainWidthX, sustainHeight, sustainWidthX, floor, releaseX, floor), amp.releaseCurve === 1],
                [ctx => ctx.curve(sustainWidthX, sustainHeight, releaseX, sustainHeight, releaseX, floor), amp.releaseCurve === 2],
            ])
            .stopTrackingShape()
            .drawShape(true, true)
            .gradientFill(175, 0, 175, 80, 'rgba(255, 95, 95, 0.6)', 'rgba(255, 95, 95, 0)')
            .styleProfile('ampHandle')
            .multiple(
                (ctx, params) => ctx.circle(...params),
                [attackX, yPad, 2],
                [decayX, sustainHeight, 2],
                [sustainWidthX, sustainHeight, 2],
                [releaseX, floor, 2]
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
        <div className="canvas-layer h-100 d-flex-col styled">
            <div className="flex-1" ref={container}>
                <canvas height="0" width="0" ref={canvas}></canvas>

                <svg
                    className="interaction-layer"
                    height={ampValues.current.height}
                    width={ampValues.current.width}
                >
                    {[0, 1, 2, 3].map(i =>
                        interactionPanel(get(i), i, () => ampClicked(i))
                    )}

                    {[0, 1, 2, 3].map(i =>
                        interactionHandle(get(i), i, e => onHandleDrag(e, i))
                    )}
                </svg>
            </div>
            <div className="env-info d-flex space-around">
                <div className="bold env-details d-flex center-child-xy">
                    A: {amp.attack.toFixed(2)} {attackCurveName}
                </div>
                <div className="bold env-details d-flex center-child-xy">
                    D: {amp.decay.toFixed(2)} {decayCurveName}
                </div>
                <div className="bold env-details d-flex center-child-xy">
                    S: {amp.sustain.toFixed(1)}
                </div>
                <div className="bold env-details d-flex center-child-xy">
                    R: {amp.release.toFixed(2)} {releaseCurveName}
                </div>
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
