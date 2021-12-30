import React, { useState } from 'react';
import './App.css';
import OscillatorContainer from './components/oscillator/Oscillator/OscillatorContainer';
import SettingsRack from './components/oscillator/Oscillator/SettingsRack/SettingsRack';

function App() {

  const base =  {
    number: 1,
    phase: 0,
    gain: 0,
    pan: 0,
    isOn: true,
    waveForm: 1,
    detune: 0,
    amp: {
      attack: 0.1,
      decay: 0.2,
      sustain: 0.5,
      sustainWidth: 0.2,
      release: 0.3,
    }
  };

  const getContext = id => {
    if (id === 0) {
      return [osc0, setOsc0];
    } else if (id === 1) {
      return [osc1, setOsc1];
    } else {
      return [osc2, setOsc2];
    }
  }

  const [selectedOsc, setSelectedOsc] = useState(0);
  const [osc0, setOsc0] = useState({...base});
  const [osc1, setOsc1] = useState({...base});
  const [osc2, setOsc2] = useState({...base});

  const updateOsc = (toUpdate, oscID) => {
    const [osc, setOsc] = getContext(oscID);
    setOsc({...osc, ...toUpdate});
  }

  const [activeOsc, _] = getContext(selectedOsc);

  return (
    <div className="main-container d-flex center-child-xy">
      <div className="synth">
        <OscillatorContainer data={ osc0 } onSelectOscillator={() => setSelectedOsc(0)} isSelected={ selectedOsc === 0 } updateOscData={ data => updateOsc(data, 0) }/>
        <OscillatorContainer data={ osc1 } onSelectOscillator={() => setSelectedOsc(1)} isSelected={ selectedOsc === 1 } updateOscData={ data => updateOsc(data, 1) }/>
        <OscillatorContainer data={ osc2 } onSelectOscillator={() => setSelectedOsc(2)} isSelected={ selectedOsc === 2 } updateOscData={ data => updateOsc(data, 2) }/>
        <SettingsRack activeOscillator={ activeOsc }></SettingsRack>
      </div>
    </div>
  );
}


export default App;
