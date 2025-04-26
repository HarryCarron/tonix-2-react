import React, { ReactElement, useState } from 'react';
import OscillatorSelector from './../../shared/oscillator-selector/oscillator-selector';
import DetuneSelector from '../../shared/detune-selector/detune-selector';
import Knob from '../../shared/rotary-control/rotary-control';
import LED from '../../shared/LED/LED';
import OscillatorControls from './oscillator-controls/oscillator-controls'
import SettingsRack from './settings-rack/settings-rack';
import { OscillatorWaveform } from './oscillator-waveforms.enums';

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
