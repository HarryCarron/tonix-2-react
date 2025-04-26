import React, {
    ReactElement,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import './Additive.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import GlobalEventHandlers from '../../../utilities/global-event-handlers';
import CanvasUtilities from '../../../utilities/canvas-utilities';
import { ClientPosition } from '../../../shared/types/client-position.types';

const PARTIALS_UPPER_LIMIT = 32;
const TOOL_BAR_HEIGHT = 15;

interface Utilities {
    globalMouseMove: GlobalEventHandlers;
    canvas: CanvasUtilities | undefined;
}

interface CanvasUtilParams {
    // todo move to canvas utils when migrating
    x: number;
    y: number;
    w: number;
    h: number;
}

export default function Additive(): ReactElement {
    const xPad = 8;
    const yPad = 12;

    const canvas = useRef<HTMLCanvasElement | null>(null);
    const container = useRef<HTMLDivElement | null>(null);

    const [partials, setPartials] = useState([1]);

    const utils = useRef<Utilities>({
        globalMouseMove: new GlobalEventHandlers(),
        canvas: undefined,
    });

    const renderValues = useRef({
        totalXTravel: 0,
        totalYTravel: 0,
        floor: 0,
    });

    const incrementPartial = (mode: boolean) => {
        let newPartials = [...partials];
        if (mode) {
            newPartials.push(1);
        } else {
            newPartials.pop();
        }

        if (
            newPartials.length <= PARTIALS_UPPER_LIMIT &&
            newPartials.length >= 0
        ) {
            setPartials(() => newPartials);
        }
    };

    const randomize = () => {
        const length = Math.floor(Math.random() * PARTIALS_UPPER_LIMIT);
        const partials = Array.from({ length }).map(_ => Math.random());
        setPartials(() => partials);
    };

    const clear = () => {
        setPartials(() => []);
    };

    const manipulatePartial = useCallback(
        ({ clientX, clientY }: ClientPosition) => {
            if (!(clientX && clientY)) {
                return;
            }
            let [x, y] = utils.current.canvas!.getTrueCoordinates(
                clientX,
                clientY,
                true
            );

            const hoveredPartial = Math.floor(x * partials.length);

            if (hoveredPartial >= partials.length) {
                return;
            }

            partials[hoveredPartial] = y;

            setPartials(state => {
                const newState = [...state];
                newState[hoveredPartial] = y;
                return newState;
            });
        },
        [setPartials, partials]
    );

    const beginPartialManipulation = useCallback(
        (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
            if (e instanceof MouseEvent) {
                manipulatePartial(e);
                utils.current.globalMouseMove.initiate((e: MouseEvent) =>
                    manipulatePartial(e)
                );
            }
        },
        [manipulatePartial]
    );

    useEffect(() => {
        renderValues.current.totalXTravel =
            container.current!.offsetWidth - xPad * 2;
        renderValues.current.totalYTravel =
            container.current!.offsetHeight - yPad;
        renderValues.current.floor = container.current!.offsetHeight - yPad / 2;

        utils.current.canvas = new CanvasUtilities(
            canvas,
            xPad,
            yPad,
            container.current!.offsetWidth,
            container.current!.offsetHeight,
            true
        );
        utils.current.canvas.setStyle({
            fillStyle: 'grey',
            strokeColor: '#c7c7c7',
            lineWidth: 1,
        });
    }, []);

    useEffect(() => {
        utils.current.canvas!.clear();
        const totalPartialsNumber = partials.length;
        const width = renderValues.current.totalXTravel / totalPartialsNumber;
        const partialPad = 3;
        utils.current.canvas!.multiple(
            (ctx: CanvasRenderingContext2D, params: CanvasUtilParams) => {
                const { h, w, x, y } = params;
                ctx.rect(x, y, w, h);
            },
            ...partials.map((partial, i) => {
                const x = xPad + width * i + partialPad / 2;
                const y = renderValues.current.floor;
                const partialWidth = width - partialPad;
                const height = renderValues.current.totalYTravel * partial * -1;
                return [x, y, partialWidth, height, true];
            })
        );
    }, [partials]);

    return (
        <div className="d-flex-col h-100">
            <div className="flex-1" ref={container}>
                <canvas
                    onMouseDown={beginPartialManipulation}
                    ref={canvas}
                    height="0"
                    width="0"
                ></canvas>
            </div>

            <div
                className="additive-controls d-flex"
                style={{ height: TOOL_BAR_HEIGHT }}
            >
                <div className="flex-1 d-flex center-child-y">
                    <button
                        className="addative-button pointer"
                        onClick={() => randomize()}
                    >
                        Randomize
                    </button>
                    <button
                        className="addative-button pointer clear"
                        onClick={() => clear()}
                    >
                        Clear
                    </button>
                </div>
                <div className="additive-tools d-flex">
                    <div className="d-flex center-child-xy">
                        <FontAwesomeIcon
                            icon={faMinus}
                            className="pointer"
                            onClick={() => incrementPartial(false)}
                        />
                    </div>
                    <div className="d-flex center-child-xy">
                        {partials.length}
                    </div>
                    <div className="d-flex center-child-xy">
                        <FontAwesomeIcon
                            icon={faPlus}
                            className="pointer"
                            onClick={() => incrementPartial(true)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
