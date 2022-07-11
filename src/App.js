import React, { useState } from 'react';
import './App.css';
import OscillatorContainer from './components/oscillator/Oscillator/OscillatorContainer';
import GlobalEventHandlers from './Utilities/GlobalEventHandlers';
import { EffectsRack } from './components/EffectsRack/EffectsRack/EffectsRack';
import SettingsRack from './components/oscillator/Oscillator/SettingsRack/SettingsRack';
function App() {
    const [signal, setSignal] = useState(false);

    new GlobalEventHandlers(signal => setSignal(signal));

    return (
        <div className="main-container d-flex center-child-xy">
            <div className="synth">
                <div className="header-bar">
                    Tonix
                    <span className="number">2</span>
                </div>
                <div className="d-flex">
                    <div className="h-100 oscillator-area f-flex-col">
                        <div className="oscillator-title">Oscillators</div>
                        <SettingsRack height={100} width={250}></SettingsRack>
                        <OscillatorContainer number={1} signal={signal} />
                        <OscillatorContainer number={2} signal={signal} />
                        <OscillatorContainer number={3} signal={signal} />
                        <OscillatorContainer number={4} signal={signal} />
                    </div>
                    <div className="filter-area h-100 d-flex-col">
                        <div className="oscillator-title">Filters</div>
                        <div className="flex-1"></div>
                        <div className="flex-1"></div>
                    </div>
                </div>
                <div className="d-flex">
                    <div className="effects-container h-100 d-flex filter-area">
                        <EffectsRack></EffectsRack>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
