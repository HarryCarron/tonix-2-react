import React, { useState } from 'react';
import './App.css';
import OscillatorContainer from './components/oscillator/Oscillator/OscillatorContainer';
import SettingsRack from './components/oscillator/Oscillator/SettingsRack/SettingsRack';
import GlobalEventHandlers from './Utilities/GlobalEventHandlers';

function App() {
  const [signal, setSignal] = useState(false);

  new GlobalEventHandlers((signal) => setSignal(signal));

  return (
    <div className='main-container d-flex center-child-xy'>
      <div className='synth'>
        <OscillatorContainer number={1} signal={signal} />
        <OscillatorContainer number={2} signal={signal} />
        <OscillatorContainer number={3} signal={signal} />
        {/* <SettingsRack activeOscillator={ activeOsc } updateOscData={amp => updateOsc(amp)}></SettingsRack> */}
      </div>
    </div>
  );
}

export default App;
