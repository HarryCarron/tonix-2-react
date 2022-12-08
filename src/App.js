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
    const activeNodes = [
        // {
        //     label: 'Keyboard',
        //     component: Keyboard,
        //     position: {
        //         top: 250,
        //         left: 120,
        //     },
        // },
        // {
        //     label: 'Polysynth',
        //     component: OscillatorBus,
        //     position: {
        //         top: 80,
        //         left: 720,
        //     },
        // },
        // {
        //     label: 'Envelope',
        //     component: Amp,
        //     position: {
        //         top: 240,
        //         left: 1250,
        //     },
        // },
        {
            label: 'Keyboard',
            component: Keyboard,
            position: {
                top: 20,
                left: 20,
            },
        },
        {
            label: 'Polysynth',
            component: OscillatorBus,
            position: {
                top: 150,
                left: 20,
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
        {
            label: 'Filter',
            component: Filter,
            position: {
                top: 300,
                left: 350,
            },
        },
    ];

    return (
        <div className="main-container d-flex-col">
            <Header></Header>

            <div className="flex-1 work-area relative">
                {activeNodes.map((activeNode, i) => (
                    <Node
                        position={activeNode.position}
                        label={activeNode.label}
                        i={i + 1}
                        component={activeNode.component}
                    ></Node>
                ))}
            </div>
        </div>
    );
}

export default App;
