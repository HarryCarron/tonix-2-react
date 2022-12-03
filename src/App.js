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
import PingPongDelay from './components/EffectsRack/PingPongDelay/PingPongDelay';
import Filter from './components/VisualisedFilters/filter/Filter';
function App() {
    return (
        <div className="main-container d-flex-col">
            <Header></Header>

            <div className="flex-1 work-area relative">
                <Node top={10} left={10}>
                    <Keyboard />
                </Node>

                <Node top={130} left={10}>
                    <OscillatorBus />
                </Node>

                <Node top={10} left={300}>
                    <Amp />
                </Node>

                <Node top={250} left={300}>
                    <Filter />
                </Node>
            </div>
        </div>
    );
}

export default App;
