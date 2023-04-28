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
import { useSelector } from 'react-redux';
import { PatchSearch } from './components/PatchSearch/PatchSearch';

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

    const activeComponents = useSelector(state => {
        return state.activeComponentSlice.activeComponents;
    });

    useEffect(() => {
        setWorkSpaceDims(() => ({
            height: workSpace.current.offsetHeight,
            width: workSpace.current.offsetWidth,
        }));
    }, [workSpace]);

    return (
        <div className="main-container d-flex-col">
            <div className="app-header d-flex center-child-y">
                <div>
                    <span className="logo">Tonix2</span>
                </div>
                {/* <div className="patch-search-container">
                    <PatchSearch></PatchSearch>
                </div> */}
            </div>
            {/* <div className="runner d-flex center-child-y"></div> */}
            <div ref={workSpace} className="flex-1 work-area relative">
                {/* <svg
                    ref={terminalArea}
                    className="absolute"
                    height={workSpaceDims.height}
                    width={workSpaceDims.width}
                >
                    <Connections connectionAttempt={connectionAttempt} />
                </svg> */}
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
            </div>
        </div>
    );
}

export default App;
