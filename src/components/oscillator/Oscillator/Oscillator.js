import './Oscillator.css';
import LED from './../../LED/LED';
import React from 'react';
import WaveformSelector from './WaveformSelector/WaveformSelector';
import DetuneSelector from './DetuneSelector/DetuneSelector';
import Knob from './../../Knob/Knob';

class Oscillator extends React.Component {

  setWaveform = (waveForm) => this.props.onUpdateOscData({...this.props.data, waveForm});

  toggleOnState = () => this.props.onUpdateOscData({...this.props.data, isOn: !this.props.data.isOn});

  setDetune = detune => this.props.onUpdateOscData({...this.props.data, detune});
  
  selectOscillator = () => this.props.onUpdateOscData({...this.props.data, selected: !this.props.data.selected});
  
  render() {

    let classes = 'oscillator d-flex';

    if (this.props.isSelected) {
      classes += ' selected-osc';
    }

    if (!this.props.data.isOn) {
      classes += ' hide-osc';
    }

    return (
      <div className={classes} onMouseDown={ this.props.onSelectOscillator }>
        <div className="d-flex-col container-1">
          <div className="d-flex center-child-xy header-item">
            <LED isOn={this.props.data.isOn} onToggleOnState={this.toggleOnState}/>
          </div>
          <div className="flex-1 d-flex center-child-xy id-container">
            {
              this.props.data.number
            }
          </div>
        </div>
        <div className="flex-1 d-flex-col h-100">
          <div className="d-flex center-child-xy header-item">
            Waveform
          </div>
          <div className="control-item d-flex center-child-xy">
            <WaveformSelector onChangeWaveForm={this.setWaveform}/>
          </div>
        </div>
        <div className="flex-1 d-flex-col h-100">
          <div className="d-flex center-child-xy header-item">
            Detune
          </div>
          <div className="control-item d-flex center-child-xy">
            <DetuneSelector detune={this.props.data.detune} onChangeDetune={this.setDetune}/>
          </div>
        </div>
        <div className="flex-1 d-flex-col h-100">
          <div className="d-flex center-child-xy header-item">
            Phase
          </div>
          <div className="control-item">
            <Knob toggleOnState={this.toggleOnState}/>
          </div>
        </div>
        <div className="flex-1 d-flex-col h-100">
          <div className="d-flex center-child-xy header-item">
            Gain
          </div>
          <div className="control-item">
            <Knob/>
          </div>
        </div>
        <div className="flex-1 d-flex-col h-100">
          <div className="d-flex center-child-xy header-item">
            Pan
          </div>
          <div className="control-item">
            <Knob/>
          </div>
        </div>
      </div>
    );
  }
  
}

export default Oscillator;
