import React, { useState } from 'react';
import './App.css';
import OscillatorContainer from './components/oscillator/Oscillator/OscillatorContainer';
import GlobalEventHandlers from './Utilities/GlobalEventHandlers';
import { EffectsRack } from './components/EffectsRack/EffectsRack/EffectsRack';
import SettingsRack from './components/oscillator/Oscillator/SettingsRack/SettingsRack';
import BandPass from './components/VisualisedFilters/BandPass/BandPass';
function App() {
    const [signal, setSignal] = useState(false);

    new GlobalEventHandlers(signal => setSignal(signal));

    return (
        <div className="main-container d-flex-col center-child-xy">
            <div className="synth">
                <div className="header-bar">
                    Tonix
                    <span className="number">2</span>
                </div>
                <div className="d-flex">
                    <div className="h-100 oscillator-area f-flex-col">
                        <div className="oscillator-title">Oscillators</div>
                        <SettingsRack></SettingsRack>
                        <OscillatorContainer number={1} signal={signal} />
                        <OscillatorContainer number={2} signal={signal} />
                        <OscillatorContainer number={3} signal={signal} />
                    </div>
                    <div className="filter-area d-flex-col">
                        <div className="oscillator-title">Filters</div>
<<<<<<< Updated upstream
                        <div className="flex-1 settings-rack settings shadow-1"></div>
=======
                        <div className="flex-1 filters-rack settings shadow-1">
                            <div className="w-100 filter-1">
                                <BandPass
                                    gain={1}
                                    freq={0.5}
                                    q={0.5}
                                    setFilter={() => null}
                                />
                            </div>
                        </div>
>>>>>>> Stashed changes
                        <div className="flex-1 settings-rack settings shadow-1"></div>
                    </div>
                </div>
                <div className="d-flex">
                    <div className="effects-container h-100 d-flex filter-area">
                        <EffectsRack></EffectsRack>
                    </div>
                </div>
            </div>
            <div className="synth-bottom"></div>
        </div>
    );
}

export default App;
