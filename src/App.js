import React, { useCallback, useEffect, useState, useRef } from 'react';
import './App.css';
import OscillatorContainer from './components/oscillator/Oscillator/OscillatorContainer';
import GlobalEventHandlers from './Utilities/GlobalEventHandlers';
import Header from './components/workSpace/Header/Header';
import Amp from './components/oscillator/Oscillator/SettingsRack/Amp/Amp';
import Node from './components/node/Node';
import OscillatorBus from './components/oscillatorBus/OscillatorBus';
import Oscillator from './components/oscillator/Oscillator/Oscillator';
import Keyboard from './components/keyboard/Keyboard';
import PingPongDelay from './components/EffectsRack/PingPongDelay/PingPongDelay';
import Filter from './components/VisualisedFilters/filter/Filter';
import { Connections } from './components/workSpace/Header/Connections/Connections';
import { AudioComponentMenu } from './components/workSpace/Header/AudioComponentMenu/AudioComponentMenu';
function App() {
    const [nodePositions, setNodePositions] = useState([]);
    const [connectionAttempt, setConnectionAttempt] = useState();

    const [workSpaceDims, setWorkSpaceDims] = useState({ height: 0, width: 0 });

    const workSpace = useRef();
    const terminalArea = useRef();

    const nodeMoved = useCallback(
        (id, terminalPositions) => {
            const offset = terminalArea.current.getBoundingClientRect().top;
            const y = terminalPositions.input.y;
            terminalPositions.output.y = y - offset;
            terminalPositions.input.y = y - offset;
            setNodePositions(state => {
                state[id] = { ...terminalPositions };
                return [...state];
            });
        },
        [setNodePositions]
    );

    const connectionAttempted = useCallback(
        (id, currentAttemptPosition) => {
            setConnectionAttempt(() => {
                if (!currentAttemptPosition) {
                    debugger;
                }

                if (currentAttemptPosition.dropped) {
                    return {};
                }
                const offset = terminalArea.current.getBoundingClientRect().top;
                currentAttemptPosition.y = currentAttemptPosition.y - offset;

                return {
                    from: nodePositions[id].output,
                    to: currentAttemptPosition,
                };
            });
        },
        [setConnectionAttempt, nodePositions]
    );
    useEffect(() => {
        setWorkSpaceDims(() => ({
            height: workSpace.current.offsetHeight,
            width: workSpace.current.offsetWidth,
        }));
    }, [workSpace]);

    const activeNodes = [
        {
            label: 'Keyboard',
            component: Keyboard,
            position: {
                top: 40,
                left: 60,
            },
        },
        {
            label: 'Polysynth',
            component: OscillatorBus,
            position: {
                top: 300,
                left: 700,
            },
        },
        {
            label: 'Envelope',
            component: Amp,
            position: {
                top: 40,
                left: 350,
            },
        },
    ];

    return (
        <div className="main-container d-flex-col">
            <div ref={workSpace} className="flex-1 work-area relative">
                <svg
                    ref={terminalArea}
                    className="absolute"
                    height={workSpaceDims.height}
                    width={workSpaceDims.width}
                >
                    <Connections connectionAttempt={connectionAttempt} />
                </svg>

                <AudioComponentMenu></AudioComponentMenu>

                {activeNodes.map(
                    (activeNode, i) =>
                        activeNode && (
                            <Node
                                key={i}
                                nodeMoved={nodeMoved}
                                position={activeNode.position}
                                label={activeNode.label}
                                i={i}
                                component={activeNode.component}
                                connectionAttempted={connectionAttempted}
                            ></Node>
                        )
                )}
            </div>
        </div>
    );
}

export default App;
