import React, { useEffect, useRef, useState, FunctionComponent } from 'react';
import './Additive.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import GlobalEventHandlers from '../../../../../Utilities/GlobalEventHandlers';
import CanvasUtilities from '../../../../../Utilities/CanvasUtilities';

const PARTIALS_UPPER_LIMIT = 32;
const TOOL_BAR_HEIGHT = 20;
const Additive: FunctionComponent = () => {
    const xPad: number = 10;
    const yPad: number = 20;

    const canvas = useRef<HTMLCanvasElement | null>(null);
    const container = useRef<HTMLDivElement>(null);

    const utils = useRef<{
        globalMouseMove: GlobalEventHandlers;
        canvas: CanvasUtilities | null;
    }>({
        globalMouseMove: new GlobalEventHandlers(),
        canvas: null,
    });

    useEffect(() => {
        if (container.current) {
            renderValues.current.totalXTravel =
                container.current.offsetWidth - xPad * 2;
            renderValues.current.totalYTravel =
                container.current.offsetHeight - yPad;
            renderValues.current.floor =
                container.current.offsetHeight - yPad / 2;

            utils.current.canvas = new CanvasUtilities(
                canvas.current as HTMLCanvasElement,
                xPad,
                yPad,
                container.current.offsetWidth,
                container.current.offsetHeight,
                true
            );
            utils.current.canvas.setStyle({
                fillStyle: 'rgba(255, 95, 95, 0.4)',
                strokeColor: '#ff5f5f',
                lineWidth: 1,
            });
        }
    }, []);

    const [partials, setPartials] = useState([1]);

    const renderValues = useRef({
        totalXTravel: 0,
        totalYTravel: 0,
        floor: 0,
    });

    const incrementPartial = (mode): void => {
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

    const randomize = (): void => {
        const length = Math.floor(Math.random() * PARTIALS_UPPER_LIMIT);
        const partials = Array.from({ length }).map(_ => Math.random());
        setPartials(() => partials);
    };

    const clear = (): void => {
        const partials = [];
        setPartials(() => partials);
    };

    const beginPartialManipulation = (e): void => {
        manipulatePartial(e);
        utils.current.globalMouseMove.initiate(e => manipulatePartial(e));
    };

    useEffect(() => {
        utils?.current?.canvas?.clear();
        const totalPartialsNumber = partials.length;
        const width = renderValues.current.totalXTravel / totalPartialsNumber;
        const partialPad = totalPartialsNumber < 10 ? 6 : 4;

        utils?.current?.canvas?.multiple(
            (ctx, params) => ctx.rect(...params),
            ...partials.map((partial, i) => {
                const x = xPad + width * i + partialPad / 2;
                const y = renderValues.current.floor;
                const partialWidth = width - partialPad;
                const height = renderValues.current.totalYTravel * partial * -1;
                return [x, y, partialWidth, height, true];
            })
        );
    }, [partials]);

    const manipulatePartial = ({ clientX, clientY }): void => {
        if (!(clientX && clientY)) {
            return;
        }

        let [x, y] = utils?.current?.canvas?.getTrueCoordinates(
            clientX,
            clientY,
            true
        ) as [number, number];

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
    };

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
                        RANDOMIZE
                    </button>
                    <button
                        className="addative-button pointer clear"
                        onClick={() => clear()}
                    >
                        CLEAR
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
};

export default Additive;
