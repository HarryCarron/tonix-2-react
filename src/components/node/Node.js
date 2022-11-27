import React from 'react';
import './Node.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Node(props) {
    return (
        <div>
            <div className="node-header d-flex node-info">
                <div className="flex-1 d-flex center-child-y">
                    <input className="pointer node-name-input w-100" />
                </div>
                <div className="d-flex center-child-xy node-action-container grabber">
                    <FontAwesomeIcon icon={faGripVertical}></FontAwesomeIcon>
                </div>
                <div className="d-flex center-child-xy node-action-container pointer">
                    <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                </div>
            </div>
            {props.children}
        </div>
    );
}
