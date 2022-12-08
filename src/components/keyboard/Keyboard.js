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

    let currentOctave = 0;
    let currentKey = -1;

    useEffect(() => {
        setContainerDim({
            height: keyboardContainer.current.clientHeight,
            width: keyboardContainer.current.clientWidth,
        });
    }, []);

    return (
        <div className="keyboard d-flex-col">
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
                                    class="natural-key"
                                    width={naturalKeyWidth}
                                    x={naturalKeyWidth * keyId}
                                    y={keyPad}
                                    height={containerDims.height}
                                    rx="1"
                                ></rect>
                            );
                        })}
                        {Array.from({ length: keysNum }).map((key, keyId) => {
                            currentKey++;
                            if (currentKey === 7) {
                                currentKey = 0;
                                currentOctave++;
                            }
                            return (
                                <>
                                    {[0, 1, 3, 4, 5].includes(currentKey) && (
                                        <rect
                                            class="minor-key"
                                            width={naturalKeyWidth / 2}
                                            x={
                                                naturalKeyWidth / 1.5 +
                                                naturalKeyWidth * keyId
                                            }
                                            y={keyPad}
                                            height={containerDims.height / 1.8}
                                            rx="1"
                                        ></rect>
                                    )}
                                </>
                            );
                        })}
                    </svg>
                </div>
                <div className="keyboard-side"></div>
            </div>
            <div className="keyboard-bottom"></div>
        </div>
    );
}
