import React, { useState } from 'react';
import './App.css';
import OscillatorContainer from './components/oscillator/Oscillator/OscillatorContainer';
import SettingsRack from './components/oscillator/Oscillator/SettingsRack/SettingsRack';
import GlobalEventHandlers from './Utilities/GlobalEventHandlers';

function App() {

  const base =  {
    phase: 0,
    gain: 1,
    pan: 0.5,
    isOn: true,
    waveForm: 1,
    detune: 0,
    amp: {
      attack: 0.1,
      attackCurve: 1,
      decay: 0.2,
      decayCurve: 1,
      sustain: 0.5,
      sustainWidth: 0.2,
      release: 0.3,
      releaseCurve: 1,
    }
  };

  const getContext = () => {
    if (selectedOsc === 0) {
      return [osc0, setOsc0];
    } else if (selectedOsc === 1) {
      return [osc1, setOsc1];
    } else {
      return [osc2, setOsc2];
    }
  }


  const [selectedOsc, setSelectedOsc] = useState(0);
  const [osc0, setOsc0] = useState({...base, amp: {...base.amp}});
  const [osc1, setOsc1] = useState({...base, amp: {...base.amp}});
  const [osc2, setOsc2] = useState({...base, amp: {...base.amp}});
  const [signal, setSignal] = useState(false);


  new GlobalEventHandlers((signal) => {
    setSignal(signal)
  });

  const updateOsc = (toUpdate) => {
    const [osc, setOsc] = getContext();
    setOsc({...osc, ...toUpdate});
  }

  const [activeOsc] = getContext(selectedOsc);

  

  return (
    <div className="main-container d-flex center-child-xy">
      <div className="synth">
        <OscillatorContainer number={1} signal={signal} data={ osc0 } onSelectOscillator={() => setSelectedOsc(0)} isSelected={ selectedOsc === 0 } updateOscData={ data => updateOsc(data) }/>
        <OscillatorContainer number={2} signal={signal} data={ osc1 } onSelectOscillator={() => setSelectedOsc(1)} isSelected={ selectedOsc === 1 } updateOscData={ data => updateOsc(data) }/>
        <OscillatorContainer number={3} signal={signal} data={ osc2 } onSelectOscillator={() => setSelectedOsc(2)} isSelected={ selectedOsc === 2 } updateOscData={ data => updateOsc(data) }/>
        <SettingsRack activeOscillator={ activeOsc } updateOscData={amp => updateOsc(amp)}></SettingsRack>
      </div>
    </div>
  );
}


export default App;
