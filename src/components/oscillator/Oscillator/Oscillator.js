import React, { useState } from 'react';
import OscillatorSelector from './DetuneSelector/OscillatorSelector/OscillatorSelector';
import DetuneSelector from './DetuneSelector/DetuneSelector';
import Knob from '../../Knob/Knob';
import LED from '../../LED/LED';
import OscillatorControls from './OscillatorControls/OscillatorControls'
import SettingsRack from './SettingsRack/SettingsRack';

export default function Oscillator(props) {
    const [oscData, setOscData] = useState({
        phase: 0,
        gain: 1,
        pan: 0.5,
        isOn: true,
        waveForm: 1,
        detune: 0,
    });

    return (
        <div className="oscillator">
            <div className="osc-title-container">
                <div className="d-flex d-flex">
                    <div className="d-flex center-child-y">
                        <LED isOn={true}></LED>
                    </div>
                    <div className="d-flex center-child-y osc-title">
                        Oscillator {
                            props.number
                        }
                    </div>
                </div>
            </div>
            <SettingsRack></SettingsRack>

            <OscillatorControls></OscillatorControls>
            
        </div>
    );
}
