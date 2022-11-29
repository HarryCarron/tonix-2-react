import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Node.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import GlobalEventHandlers from '../../Utilities/GlobalEventHandlers';

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
    const left = `${position.left}px`;
    const top = `${position.top}px`;

    return (
        <div
            ref={nodeContainer}
            className="absolute node"
            style={{
                left,
                top,
                transform: scale,
            }}
        >
            <div className="node-header d-flex node-info">
                <div className="flex-1 d-flex center-child-y">
                    <input className="pointer node-name-input w-100" />
                </div>
                <div
                    onMouseDown={$event => initiateMove($event)}
                    className="d-flex center-child-xy node-action-container grabber"
                >
                    <FontAwesomeIcon icon={faGripVertical}></FontAwesomeIcon>
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
                {props.children}
            </div>
        </div>
    );
}
