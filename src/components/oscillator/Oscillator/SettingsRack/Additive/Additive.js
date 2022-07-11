import React, { useEffect, useRef, useState } from 'react';
import './Additive.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import GlobalEventHandlers from '../../../../../Utilities/GlobalEventHandlers';
import CanvasUtilities from '../../../../../Utilities/CanvasUtilities';

const PARTIALS_UPPER_LIMIT = 32;
const TOOL_BAR_HEIGHT = 24;
export default function Additive(props) {
    const xPad = 10;
    const yPad = 5;

    const canvas = useRef();

    const [partials, setPartials] = useState([1]);

    const utils = useRef({
        globalMouseMove: new GlobalEventHandlers(),
        canvas: null,
    });

    const renderValues = useRef({
        totalXTravel: props.dims.width - xPad * 2,
        totalYTravel: props.dims.height - TOOL_BAR_HEIGHT - xPad * 2,
        floor: props.dims.height - TOOL_BAR_HEIGHT - yPad / 2,
    });

    const incrementPartial = mode => {
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
        const partials = [];
        setPartials(() => partials);
    };

    const beginPartialManipulation = e => {
        manipulatePartial(e);
        utils.current.globalMouseMove.initiate(e => manipulatePartial(e));
    };

    useEffect(() => {
        utils.current.canvas = new CanvasUtilities(
            canvas,
            xPad,
            yPad,
            props.dims.width,
            props.dims.height - TOOL_BAR_HEIGHT,
            true
        );
        utils.current.canvas.setStyle({
            fillStyle: 'rgba(255, 255, 255, 0.1)',
            glow: [5, 'rgba(255, 255, 255, 1)'],
            strokeColor: 'rgba(255, 255, 255, 0.2)',
            lineWidth: 1,
        });
    }, [props.dims.width, props.dims.height]);

    useEffect(() => {
        utils.current.canvas.clear();

        const totalPartialsNumber = partials.length;
        const width = renderValues.current.totalXTravel / totalPartialsNumber;
        const partialPad = totalPartialsNumber < 10 ? 6 : 4;

        utils.current.canvas.multiple(
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

    const manipulatePartial = ({ clientX, clientY }) => {
        if (!(clientX && clientY)) {
            return;
        }
        let [x, y] = utils.current.canvas.getTrueCoordinates(
            clientX,
            clientY,
            true
        );

        const hoveredPartial = Math.floor(x * partials.length);

        if (hoveredPartial >= partials.length) {
            return;
        }

        partials[hoveredPartial] = y;

        setPartials(() => partials);
    };

    return (
        <div
            className="d-flex-col"
            style={{ height: props.dims.height, width: props.dims.width }}
        >
            <div className="flex-1 w-100">
                <canvas
                    onMouseDown={beginPartialManipulation}
                    ref={canvas}
                    height="0"
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
}
