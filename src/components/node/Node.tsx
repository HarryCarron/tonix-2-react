import React, { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import './Node.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import GlobalEventHandlers from '../../Utilities/GlobalEventHandlers';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { componentRegistryMap } from '../../registry/componentRegistry';

import { removeFromWorkspace } from '../../store/features/activeComponents/activeComponentSlice';

import { useSelector, useDispatch } from 'react-redux';
import {
    attemptConnection,
    updateConnection,
    connectionSuccess,
} from '../../store/features/connector/connectorSlice';
import { ClientPosition } from '../../shared/types/clientPosition';

interface NodePosition {
    top: number;
    left: number;
}



interface NodeProps {
    label: string;
    i: number;
    component: string;
    position: NodePosition;
}

export default function Node({
    label,
    i,
    component,
    position: initialPosition,
}: NodeProps): ReactElement<NodeProps> {
    const nodeContainer = useRef<HTMLDivElement | null>(null);
    const rightTerminal = useRef<HTMLDivElement | null>(null);
    const leftTerminal = useRef<HTMLDivElement | null>(null);
    const globalMouseMove = useRef(new GlobalEventHandlers());
    const [position, setPosition] = useState({
        top: initialPosition.top,
        left: initialPosition.left,
    });

    const dispatch = useDispatch();

    const [moving, setMoving] = useState(false);

    const initiateConnection = useCallback(() => {
        globalMouseMove.current.initiate(
            ({ clientX, clientY }: ClientPosition) => {
                let { left, width, top, height } =
                    rightTerminal.current!.getBoundingClientRect();

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
            ({ clientX, clientY }: ClientPosition) => {
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
            ({ clientX, clientY }: ClientPosition) => {
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
                        onMouseDown={$event => initiateMove()}
                        className="d-flex center-child-xy node-action-container grabber"
                    >
                        <FontAwesomeIcon
                            icon={faGripVertical}
                        ></FontAwesomeIcon>
                    </div>
                    <div
                        className="d-flex center-child-xy node-action-container pointer"
                        onClick={() => dispatch(removeFromWorkspace(component))}
                    >
                        <FontAwesomeIcon icon={faTimes}/>
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
                    {componentRegistryMap[component]({}, null)}
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
