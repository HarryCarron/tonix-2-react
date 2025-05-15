import React, { useCallback, useEffect, useState, useRef } from 'react';
import './App.css';
import OscillatorContainer from './components/instruments/oscillator/oscillator';
import GlobalEventHandlers from './utilities/global-event-handlers';
import Amp from './components/shared/amp/amp';
import Node from './components/node/node';
import Oscillator from './components/instruments/oscillator/oscillator';
import Keyboard from './components/midi-devices/keyboard/keyboard';
import PingPongDelay from './components/effects/ping-pong-delay/ping-pong-delay';
import Filter from './components/effects/filter/filter';
import { Connections } from './components/work-space/connections/connections';
import { AudioComponentMenu } from './components/work-space/menu/menu';
import { useSelector } from 'react-redux';

function App() {
    const [nodePositions, setNodePositions] = useState([]);
    const [connectionAttempt, setConnectionAttempt] = useState();

    const [workSpaceDims, setWorkSpaceDims] = useState({ height: 0, width: 0 });

    const workSpace = useRef();
    const terminalArea = useRef();

    // const nodeMoved = useCallback(
    //     (id, terminalPositions) => {
    //         const offset = terminalArea.current.getBoundingClientRect().top;
    //         const y = terminalPositions.input.y;
    //         terminalPositions.output.y = y - offset;
    //         terminalPositions.input.y = y - offset;
    //         setNodePositions(state => {
    //             state[id] = { ...terminalPositions };
    //             return [...state];
    //         });
    //     },
    //     [setNodePositions]
    // );

    // const activeComponents = useSelector(state => {
    //     return state.activeComponentSlice.activeComponents;
    // });

    // useEffect(() => {
    //     setWorkSpaceDims(() => ({
    //         height: workSpace.current!.offsetHeight,
    //         width: workSpace.current!.offsetWidth,
    //     }));
    // }, [workSpace]);

    return (
        <div className="main-container d-flex-col">
            {/* <div className="app-header d-flex center-child-y">
                <div>
                    <span className="logo">Tonix2</span>
                </div>
            </div>
            <div ref={workSpace} className="flex-1 work-area relative">
                <AudioComponentMenu> </AudioComponentMenu>
                {activeComponents.map(
                    (activeComponent, i) =>
                        activeComponent && (
                            <Node
                                key={i}
                                nodeMoved={nodeMoved}
                                position={{ top: 100, left: 300 }}
                                label={''}
                                i={i}
                                component={activeComponent}
                            ></Node>
                        )
                )}
            </div> */}
        </div>
    );
}

export default App;
