import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import './App.css';
import OscillatorContainer from './components/oscillator/Oscillator/OscillatorContainer';
import SettingsRack from './components/oscillator/Oscillator/SettingsRack/SettingsRack';
import GlobalEventHandlers from './Utilities/GlobalEventHandlers';
import { EffectsRack } from './components/EffectsRack/EffectsRack/EffectsRack';

function App() {
    const [signal, setSignal] = useState(false);

    new GlobalEventHandlers(signal => setSignal(signal));

    return (
        <div className="main-container d-flex center-child-xy">
            <div className="synth d-flex">
                <div className="h-100 oscillator-area">
                    <OscillatorContainer number={1} signal={signal} />
                    <OscillatorContainer number={2} signal={signal} />
                    <OscillatorContainer number={3} signal={signal} />
                </div>

                <div className="effects-container h-100 d-flex-col filter-area">
                    <EffectsRack></EffectsRack>
                </div>
            </div>
        </div>
    );
}

export default App;
