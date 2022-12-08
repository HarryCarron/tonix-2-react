import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Node.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import GlobalEventHandlers from '../../Utilities/GlobalEventHandlers';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Node(props) {
    const nodeContainer = useRef();
    const globalMouseMove = useRef(new GlobalEventHandlers());
    const [position, setPosition] = useState({
        top: props.top,
        left: props.left,
    });

    const [moving, setMoving] = useState(false);

    const initiateMove = useCallback(() => {
        setMoving(true);
        globalMouseMove.current.initiate(
            ({ clientX, clientY }) => {
                setPosition({
                    left: clientX,
                    top: clientY,
                });
            },
            () => setMoving(false)
        );
    }, [setPosition]);

    const scale = `scale(${moving ? '1.02' : '1'})`;
    const left = `${props.position.left}px`;
    const top = `${props.position.top}px`;

    return (
        <div
            ref={nodeContainer}
            className="absolute node d-flex"
            style={{
                left,
                top,
                transform: scale,
            }}
        >
            <div className="d-flex center-child-y">
                <div className="connector d-flex center-child-xy -left">
                    <FontAwesomeIcon icon={faArrowRight} />
                </div>
            </div>
            <div className="node-body">
                <div className="node-header d-flex node-info">
                    <div className="flex-1 d-flex center-child-y">
                        <input
                            className="pointer node-name-input w-100"
                            value={'Node ' + props.i}
                        />
                    </div>
                    <div
                        onMouseDown={$event => initiateMove($event)}
                        className="d-flex center-child-xy node-action-container grabber"
                    >
                        <FontAwesomeIcon
                            icon={faGripVertical}
                        ></FontAwesomeIcon>
                    </div>
                    <div className="d-flex center-child-xy node-action-container pointer">
                        <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                    </div>
                </div>

                <div
                    className={
                        (moving ? 'shadow-4-moving' : 'shadow-4') +
                        ' item-container'
                    }
                >
                    <div className="oscillator-title d-flex">
                        <div className="flex-1 d-fle center-child-xy ">
                            {props.label}
                        </div>
                    </div>
                    {props.component()}
                </div>
            </div>

            <div className="d-flex center-child-y">
                <div className="connector d-flex center-child-xy -right">
                    <FontAwesomeIcon icon={faArrowRight} />
                </div>
            </div>
        </div>
    );
}
