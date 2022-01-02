
import React from 'react';
import WaveformSelector from './WaveformSelector/WaveformSelector';
import DetuneSelector from './DetuneSelector/DetuneSelector';
import Knob from './../../Knob/Knob';
import LED from './../../LED/LED';
import Signal from './../../Signal/Signal';


export default function Oscillator(props) {

    let classes = 'oscillator d-flex';

    if (props.isSelected) {
      classes += ' selected-osc';
    }

    if (!props.data.isOn) {
      classes += ' hide-osc';
    }

    // console.log('osc rendered');

    return (
        <div className={classes} onMouseDown={ props.onSelectOscillator }>
            <div className="d-flex-col container-1">
                <div className="d-flex center-child-xy header-item">
                    <LED isOn={ props.data.isOn } updateOscData={ props.updateOscData }/>
                </div>
                <div className="flex-1 d-flex center-child-xy id-container">
                    {
                        props.number
                    }
                </div>
            </div>
            <div className="flex-1 d-flex-col h-100">
                <div className="d-flex center-child-xy header-item">
                    Waveform
                </div>
                <div className="control-item d-flex center-child-xy">
                    <WaveformSelector onChangeWaveForm={props.setWaveform}/>
                </div>
            </div>
            <div className="flex-1 d-flex-col h-100">
                <div className="d-flex center-child-xy header-item">
                    Detune
                </div>
                <div className="control-item d-flex center-child-xy">
                    <DetuneSelector detune={props.data.detune} onChangeDetune={props.setDetune}/>
                </div>
            </div>
            <div className="flex-1 d-flex-col h-100 knob-container">
                <div className="d-flex center-child-xy header-item">
                    Phase
                </div>
                <div className="control-item">
                    <Knob size={45} updateOscData={ data => props.updateOscData(data) } value={props.data.phase} toggleOnState={props.toggleOnState}/>
                </div>
            </div>
            <div className="flex-1 d-flex-col h-100 knob-container">
                <div className="d-flex center-child-xy header-item">
                    Gain
                </div>
                <div className="control-item">
                    <Knob size={45} updateOscData={ data => props.updateOscData(data) } value={props.data.gain}/>
                </div>
            </div>
            <div className="flex-1 d-flex-col h-100 knob-container">
                <div className="d-flex center-child-xy header-item">
                    Pan
                </div>
                <div className="control-item">
                    <Knob size={45} updateOscData={ data => props.updateOscData(data) } value={props.data.pan}/>
                </div>
            </div>

            <div className="flex-1 d-flex-col h-100 outer-signal-container">
                <div className="d-flex center-child-xy header-item">
                    Signal
                </div>
                <div className="control-item d-flex">
                    <div className="flex-1">
                        <Signal hasSignal={props.signal}/>
                    </div>
                    <div className="flex-1">
                        <Signal hasSignal={props.signal}/>
                    </div>
                </div>
            </div>
        </div>
    );
}