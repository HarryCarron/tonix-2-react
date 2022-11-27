import React, { useState } from 'react';
import './App.css';
import OscillatorContainer from './components/oscillator/Oscillator/OscillatorContainer';
import GlobalEventHandlers from './Utilities/GlobalEventHandlers';
import Header from './components/workSpace/Header/Header';
import Amp from './components/oscillator/Oscillator/SettingsRack/Amp/Amp';
import Node from './components/node/Node';
import OscillatorBus from './components/oscillatorBus/OscillatorBus';
import Oscillator from './components/oscillator/Oscillator/Oscillator';

function App() {
    return (
        <div className="main-container d-flex-col">
            <Header></Header>

            <div className="flex-1 work-area d-flex center-child-xy">
                <div className="d-flex">
                    <Node>
                        <OscillatorBus />
                    </Node>
                    <div
                        style={{ marginLeft: '100px' }}
                        className="d-flex center-child-y"
                    >
                        <Node>
                            <Amp />
                        </Node>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
