import React, { useState } from 'react';
import './App.css';
import OscillatorContainer from './components/oscillator/Oscillator/OscillatorContainer';
import GlobalEventHandlers from './Utilities/GlobalEventHandlers';
import { PatchSearch } from './components/PatchSearch/PatchSearch';
import Oscillator from './components/oscillator/Oscillator/Oscillator';
function App() {
    const [signal, setSignal] = useState(false);

    new GlobalEventHandlers(signal => setSignal(signal));

    return (
        <div className="main-container d-flex-col center-child-xy">
            <div className="synth">
                <div className="d-flex header-bar">
                    <div className="app-title">
                        Tonix
                        <span className="number">2</span>
                    </div>
                    <div className="flex-1 d-flex">
                        <PatchSearch />
                    </div>
                </div>

                <div className="d-flex">
                    <div className="h-100 oscillator-area">
                        <div className="oscillator-title">Voice</div>

                        <div className="d-flex">
                            <div>
                                { [1,2,3].map(
                                number => 
                                    <Oscillator number={number}/>
                                ) }
                            </div>
                        </div>

                    </div>

                </div>
                <div className="w-100 synth-bottom"></div>
            </div>
            

        </div>
    );
}

export default App;
