import React, { ReactElement, useState } from 'react';
import OscillatorSelector from './DetuneSelector/OscillatorSelector/OscillatorSelector';
import DetuneSelector from './DetuneSelector/DetuneSelector';
import Knob from '../../RotaryControl/RotaryControl';
import LED from '../../LED/LED';
import OscillatorControls from './OscillatorControls/OscillatorControls'
import SettingsRack from './SettingsRack/SettingsRack';
import { OscillatorWaveform } from './oscillatorWaveforms.enums';

export interface OscillatorProps { // todo maybe move to feature root
    number: number;
}

interface OscillatorData {
    phase: number,
    gain: number,
    pan: number,
    isOn: boolean,
    waveForm: OscillatorWaveform,
    detune: number,
}

export default function Oscillator(props: OscillatorProps): ReactElement<OscillatorProps> {
    const [oscData, setOscData] = useState<OscillatorData>({
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
