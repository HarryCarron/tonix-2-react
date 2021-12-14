import './Oscillator.css';
import LED from './../../LED/LED';
import React from 'react';
import WaveformSelector from './WaveformSelector/WaveformSelector';
import DetuneSelector from './DetuneSelector/DetuneSelector';

// 1 sine
// 2 saw
// 3 square 

class Oscillator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOn: false,
      selected: false,
      waveForm: 1,
      detune: 0
    };
  }

  toggleOnState() {
    this.setState((state, props) =>  ({isOn: !state.isOn}));
  }

  setWaveform(waveForm) {
    this.setState({waveForm});
  }

  setDetune(detune) {
    this.setState({detune});
  }

  selectOscillator() {
    this.props.onSelectOscillator(this.props.id);
  }

  render() {

    let classes = 'oscillator d-flex';

    if (this.props.selected) {
      classes += ' selected-osc';
    }

    if (!this.state.isOn) {
      classes += ' hide-osc';
    }

    return (
      <div className={classes} onClick={() => this.selectOscillator()}>
        <div className="d-flex-col container-1">
          <div className="d-flex center-child-xy header-item">
            <LED isOn={this.state.isOn} onToggleOnState={() => this.toggleOnState()}/>
          </div>
          <div className="flex-1 d-flex center-child-xy id-container">
            {
              this.props.id
            }
          </div>
        </div>
        <div className="flex-1">
          <div className="d-flex center-child-xy header-item">
              Waveform
          </div>
          <WaveformSelector onChangeWaveForm={(waveform) => this.setWaveform(waveform)}/>
        </div>
        <div className="flex-1">
          <div className="d-flex center-child-xy header-item">
            Detune
          </div>
          <DetuneSelector detune={this.state.detune} onChangeDetune={(detune) => this.setDetune(detune)}/>
        </div>
        <div className="flex-1">

        </div>
      </div>
    );
  }
  
}

export default Oscillator;
