import React, {
    useEffect,
    useRef,
    useCallback,
    useState,
    useLayoutEffect,
    FunctionComponent,
    ReactElement,
} from 'react';
import { CircleTuple, LineTuple } from '../../../../../types/CanvasUtilities';
import CanvasUtilities from '../../../../../Utilities/CanvasUtilities';
import GlobalEventHandlers from '../../../../../Utilities/GlobalEventHandlers';
import './Amp.css';

enum Section {
    attack,
    decay,
    sustain,
    release,
}

interface AmpWidths {
    attack: number;
    decay: number;
    sustainWidth: number;
    release: number;
}

type LineType = Section;
type HandleType = Section;

enum CurveType {
    LIN,
    COS,
    EXP,
}

interface SectionDetail {
    x: number;
    width: number;
    handle: {
        x: number;
        y: number;
    };
}

export const Amp: FunctionComponent = () => {
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

    const globalMouseMove = useRef(new GlobalEventHandlers());
    const canvasUtils = useRef<CanvasUtilities>();

    const getCurveName = (): CurveType[] =>
        [amp.attackCurve, amp.decayCurve, amp.releaseCurve].map(curve => {
            if (curve === 0) {
                return CurveType.LIN;
            }
            if (curve === 1) {
                return CurveType.EXP;
            }
            return CurveType.COS;
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

    const canvasElem = useRef<HTMLCanvasElement>();
    const container = useRef<HTMLDivElement>();

    useLayoutEffect(() => {
        if (container.current) {
            ampValues.current.totalXTravel =
                container.current.offsetWidth - xPad * 2;
            ampValues.current.totalYTravel =
                container.current.offsetHeight - yPad * 2;

            ampValues.current.floor = container.current.offsetHeight - yPad;

            ampValues.current.height = container.current.offsetHeight;
            ampValues.current.width = container.current.offsetWidth;

            viewReady(true);
        }
    }, []);

    useEffect(() => {
        canvasUtils.current = new CanvasUtilities(
            canvasElem.current,
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
        const getXpositions = (): number[] => {
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
        // prettier-ignore
        canvasUtils.current.clear()
            .styleProfile('baseLine')
            .multiple(
                (ctx, params: LineTuple) => ctx.line(...params),
                [xPad, floor, ampValues.current.width - xPad, floor],
                [xPad, floor, xPad, yPad]
            )
            .styleProfile('ampGuide')
            .multiple(
                (ctx, params: LineTuple) => ctx.line(...params),
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
                (ctx, params: CircleTuple) => ctx.circle(...params),
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

    useEffect(() => drawAmp(), [drawAmp]);

    const validateValue = (value: number) => {
        if (value >= 1) {
            return 1;
        }
        if (value <= 0) {
            return 0;
        }

        return value;
    };

    const widthValid = (amp: AmpWidths): boolean => {
        return (
            [amp.attack, amp.decay, amp.sustainWidth, amp.release].reduce(
                (a, b) => a + b
            ) < 1
        );
    };

    const handleClick = ({ clientX, clientY }, i: HandleType) => {
        if (!(clientX && clientY)) {
            return;
        }
        let [x, y] = canvasUtils.current.getTrueCoordinates(
            clientX,
            clientY,
            false
        );

        switch (i) {
            case Section.attack: {
                let attack = validateValue(x);
                setAmp(state => {
                    if (widthValid({ ...state, attack })) {
                        return { ...state, attack };
                    }
                    return state;
                });
                break;
            }
            case Section.decay: {
                const decay = validateValue(x - amp.attack);
                const sustain = validateValue(y);
                setAmp(state => {
                    if (widthValid({ ...state, decay })) {
                        return { ...state, decay };
                    }
                    return state;
                });
                setAmp(state => ({ ...state, sustain }));
                break;
            }
            case Section.sustain: {
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
            case Section.release: {
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

    const onHandleDrag = (e: React.MouseEvent<SVGElement>, i: LineType) => {
        handleClick(e, i);
        globalMouseMove.current.initiate(e => handleClick(e, i));
    };

    const ampClicked = (i: Section): void => {
        let currentCurve: number;
        let set: () => void;
        switch (i) {
            case Section.attack: {
                currentCurve = amp.attackCurve;
                set = () => setAmp({ ...amp, attackCurve: currentCurve });
                break;
            }
            case Section.decay: {
                currentCurve = amp.decayCurve;
                set = () => setAmp({ ...amp, decayCurve: currentCurve });
                break;
            }
            case Section.release: {
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
            currentCurve = ++currentCurve;
        }

        set?.();
    };

    const get = (id: LineType): SectionDetail => {
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
                <canvas height="0" width="0" ref={canvasElem}></canvas>

                <svg
                    className="interaction-layer"
                    height={ampValues.current.height}
                    width={ampValues.current.width}
                >
                    {[0, 1, 2, 3].map((i: Section) =>
                        interactionPanel(get(i), i, () => ampClicked(i))
                    )}

                    {[0, 1, 2, 3].map((i: HandleType) =>
                        interactionHandle(
                            get(i),
                            i,
                            (e: React.MouseEvent<SVGElement>) =>
                                onHandleDrag(e, i)
                        )
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
};

const interactionPanel = (
    { x, width },
    i: number,
    onAmpClick: (e: React.MouseEvent<SVGElement>) => void
): ReactElement<SVGRectElement> => (
    <rect
        key={i}
        onClick={(e: React.MouseEvent<SVGElement>) => onAmpClick(e)}
        x={x}
        width={width}
        y="0"
    />
);

const interactionHandle = (
    { handle: { x, y } },
    i: number,
    onHandleDrag: (e: React.MouseEvent<SVGElement>) => void
): ReactElement<SVGCircleElement> => (
    <circle
        key={i}
        onMouseDown={(e: React.MouseEvent<SVGElement>) => onHandleDrag(e)}
        cx={x}
        cy={y}
        r="5"
    />
);

export default Amp;
