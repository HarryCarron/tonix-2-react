import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './Keyboard.css';

export default function Keyboard() {
    const keyPad = 1;

    const keyboardContainer = useRef();

    const [containerDims, setContainerDim] = useState({
        height: 0,
        width: 0,
    });

    const keysNum = 7 * 5;
    const naturalKeyWidth = containerDims.width / keysNum;
    const sharpKeyWidth = containerDims.width / keysNum / 2;

    useEffect(() => {
        setContainerDim({
            height: keyboardContainer.current.clientHeight,
            width: keyboardContainer.current.clientWidth,
        });
    }, []);

    return (
        <div className="keyboard d-flex-col">
            <div className="keyboard-top">
                <div className="oscillator-title d-flex">
                    <div>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </div>
                    <div className="flex-1 d-fle center-child-xy ">
                        Keyboard
                    </div>

                    <div>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </div>
                </div>
            </div>
            <div className="d-flex flex-1">
                <div className="keyboard-side"></div>
                <div className="flex-1 keys-background" ref={keyboardContainer}>
                    <svg
                        width={containerDims.width}
                        height={containerDims.height}
                    >
                        {Array.from({ length: keysNum }).map((key, keyId) => {
                            return (
                                <rect
                                    class="key"
                                    width={naturalKeyWidth}
                                    x={naturalKeyWidth * keyId}
                                    y={keyPad}
                                    height={containerDims.height}
                                    rx="1"
                                ></rect>
                            );
                        })}
                    </svg>
                </div>
                <div className="keyboard-side-right"></div>
            </div>
            <div className="keyboard-bottom"></div>
        </div>
    );
}
