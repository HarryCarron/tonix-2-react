import React, { useState } from 'react';
import './App.css';
import OscillatorContainer from './components/oscillator/Oscillator/OscillatorContainer';
import GlobalEventHandlers from './Utilities/GlobalEventHandlers';
import Header from './components/workSpace/Header/Header';
import Amp from './components/oscillator/Oscillator/SettingsRack/Amp/Amp';
import Node from './components/node/Node';
import OscillatorBus from './components/oscillatorBus/OscillatorBus';
import Oscillator from './components/oscillator/Oscillator/Oscillator';
import Keyboard from './components/keyboard/Keyboard';

function App() {
    return (
        <div className="main-container d-flex-col">
            <Header></Header>

            <div className="flex-1 work-area relative">
                <Node top={100} left={200}>
                    <Keyboard />
                </Node>

                <Node top={100} left={200}>
                    <OscillatorBus />
                </Node>

                <Node top={100} left={600}>
                    <Amp />
                </Node>
            </div>
        </div>
    );
}

export default App;
