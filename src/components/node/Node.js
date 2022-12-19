import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Node.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import GlobalEventHandlers from '../../Utilities/GlobalEventHandlers';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { useSelector, useDispatch } from 'react-redux';
import {
    attemptConnection,
    updateConnection,
    connectionSuccess,
} from './../../store/features/connector/connectorSlice';

export default function Node({ nodeMoved, label, i, component }) {
    const nodeContainer = useRef();
    const rightTerminal = useRef();
    const leftTerminal = useRef();
    const globalMouseMove = useRef(new GlobalEventHandlers());
    const [position, setPosition] = useState({
        top: 10,
        left: 10,
    });

    const dispatch = useDispatch();

    const [moving, setMoving] = useState(false);

    // useEffect(() => {
    //     const [input, output] = [
    //         leftTerminal.current,
    //         rightTerminal.current,
    //     ].map((terminal, i) => {
    //         let { left, width, top, height } = terminal.getBoundingClientRect();

    //         return {
    //             x: left + (!i ? 0 : width) - 3,
    //             y: top + height / 2,
    //             terminal,
    //         };
    //     });
    //     nodeMoved(i, {
    //         input,
    //         output,
    //     });
    // }, [nodeMoved, position, i]);

    const initiateConnection = useCallback(() => {
        globalMouseMove.current.initiate(
            ({ clientX, clientY }) => {
                let { left, width, top, height } =
                    rightTerminal.current.getBoundingClientRect();

                const to = {
                    x: left,
                    y: top + height / 2,
                };
                dispatch(
                    attemptConnection({
                        to,
                        from: {
                            x: clientX,
                            y: clientY,
                        },
                    })
                );
            },
            ({ clientX, clientY }) => {
                dispatch(
                    connectionSuccess({
                        x: clientX,
                        y: clientY,
                    })
                );
            }
        );
    }, [dispatch]);

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
            className="absolute node d-flex"
            style={{
                left,
                top,
                transform: scale,
            }}
        >
            <div className="d-flex center-child-y">
                <div
                    className="connector d-flex center-child-xy -left"
                    ref={leftTerminal}
                >
                    <FontAwesomeIcon icon={faArrowRight} />
                </div>
            </div>
            <div className="node-body">
                <div className="node-header d-flex node-info">
                    <div className="flex-1 d-flex center-child-y">
                        <input
                            className="pointer node-name-input w-100"
                            value={'Node ' + i}
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
                            {label}
                        </div>
                    </div>
                    {component()}
                </div>
            </div>

            <div className="d-flex center-child-y">
                <div
                    className={'connector d-flex center-child-xy -right '}
                    ref={rightTerminal}
                    onMouseDown={initiateConnection}
                >
                    <FontAwesomeIcon icon={faArrowRight} />
                </div>
            </div>
        </div>
    );
}
