import React, { useEffect, useRef } from 'react';
import './Additive.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import GlobalEventHandlers from './../../../../../Utilities/GlobalEventHandlers';
import CanvasUtilities from './../../../../../Utilities/CanvasUtilities';

const PARTIALS_UPPER_LIMIT = 32;
const TOOL_BAR_HEIGHT = 24;
export default function Additive(props) {
    const xPad = 10;
    const yPad = 10;

    const canvas = useRef();

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
        let partials = [...props.partials];
        if (mode) {
            partials.push(1);
        } else {
            partials.pop();
        }

        if (partials.length <= PARTIALS_UPPER_LIMIT && partials.length >= 0) {
            props.setPartials(partials);
        }
    };

    const randomize = () => {
        const length = Math.floor(Math.random() * PARTIALS_UPPER_LIMIT);
        const partials = Array.from({ length }).map(_ => Math.random());
        props.setPartials(partials);
    };

    const clear = () => {
        const partials = [];
        props.setPartials(partials);
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
            fillStyle: 'rgba(230, 85, 121, 0.3)',
            strokeColor: '#fe5f55',
            lineWidth: 1,
        });
    }, [props.dims.width, props.dims.height]);

    useEffect(() => {
        utils.current.canvas.clear();

        // rect(x, y, width, height, fill) {

        const totalPartialsNumber = props.partials.length;
        const width = renderValues.current.totalXTravel / totalPartialsNumber;
        const partialPad = totalPartialsNumber < 10 ? 6 : 4;

        utils.current.canvas.multiple(
            (ctx, params) => ctx.rect(...params),
            ...props.partials.map((partial, i) => {
                const x = xPad + width * i + partialPad / 2;
                const y = renderValues.current.floor;
                const partialWidth = width - partialPad;
                const height = renderValues.current.totalYTravel * partial * -1;

                return [x, y, partialWidth, height, true];
            })
        );
    }, [props.partials]);

    const manipulatePartial = ({ clientX, clientY }) => {
        if (!(clientX && clientY)) {
            return;
        }
        let [x, y] = utils.current.canvas.getTrueCoordinates(
            clientX,
            clientY,
            true
        );

        const hoveredPartial = Math.floor(x * props.partials.length);

        const partials = props.partials;

        if (hoveredPartial >= partials.length) {
            return;
        }

        partials[hoveredPartial] = y;

        props.setPartials(partials);
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
            <div className="additive-controls d-flex">
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
                        {props.partials.length}
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
