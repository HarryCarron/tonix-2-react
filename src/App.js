import React from 'react';
import './App.css';
import Oscillator from './components/oscillator/Oscillator/Oscillator';
import SettingsRack from './components/oscillator/Oscillator/SettingsRack/SettingsRack';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedOscillator: 0,
      osc0: {
        number: 1,
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
      },
      osc1: {
        number: 2,
        isOn: true,
        waveForm: 1,
        detune: 0,
        amp: {
          attack: 0.1,
          decay: 0.4,
          sustain: 0.3,
          sustainWidth: 0.2,
          release: 0.1,
        }
      },
      osc2: {
        number: 3,
        isOn: true,
        waveForm: 1,
        detune: 0,
        amp: {
          attack: 0.2,
          decay: 0.1,
          sustain: 0.2,
          sustainWidth: 0.2,
          release: 0.1,
        }
      }
    }
  }

  componentDidMount() {}

  selectOscillator(selectedOscillator) {
    this.setState({selectedOscillator});
  }

  onUpdateOscData = (updatedOscData, oscID) => {
    const oscKey = `osc${oscID}`;
    const updatedData = {[oscKey]: {...updatedOscData} }
    this.setState(updatedData);
  }

  getActiveOscillator() {
    const selectedOscillatorID = this.state.selectedOscillator;
    const key = `osc${selectedOscillatorID}`;

    return this.state[key];
  }

  render() {

    const activeOscillator = this.state[`osc${this.state.selectedOscillator}`];

    return (
      <div className="main-container d-flex center-child-xy">
        <div className="synth">
          <Oscillator data={ this.state.osc0 } onSelectOscillator={() => this.selectOscillator(0)} isSelected={this.state.selectedOscillator === 0} onUpdateOscData={ data =>this.onUpdateOscData(data, 0) }/>
          <Oscillator data={ this.state.osc1 } onSelectOscillator={() => this.selectOscillator(1)} isSelected={this.state.selectedOscillator === 1} onUpdateOscData={ data =>this.onUpdateOscData(data, 1) }/>
          <Oscillator data={ this.state.osc2 } onSelectOscillator={() => this.selectOscillator(2)} isSelected={this.state.selectedOscillator === 2} onUpdateOscData={ data =>this.onUpdateOscData(data, 2) }/>
          <SettingsRack activeSetting={1} activeOscillator={ activeOscillator }></SettingsRack>
        </div>
      </div>
    );
  }
  
}

export default App;
