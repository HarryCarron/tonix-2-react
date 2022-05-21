import React, { useState } from 'react';
import WaveformSelector from './WaveformSelector/WaveformSelector';
import DetuneSelector from './DetuneSelector/DetuneSelector';
import Knob from '../../Knob/Knob';
import LED from '../../LED/LED';
import Signal from '../../Signal/Signal';
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

    const [partials, setPartials] = useState([]);

    let classes = 'oscillator d-flex-col';

    if (!oscData.isOn) {
        classes += ' hide-osc';
    }

    return (
        <div className={classes}>
            <div className="d-flex controls-row">
                <div className="d-flex-col container-1">
                    <div className="d-flex center-child-xy header-item">
                        <LED
                            updateOscData={props.updateOscData}
                            isOn={oscData.isOn}
                        />
                    </div>
                    <div className="flex-1 d-flex center-child-xy id-container">
                        {props.number}
                    </div>
                </div>
                <div className="flex-1 d-flex-col">
                    <div className="d-flex center-child-xy header-item">
                        Waveform
                    </div>
                    <div className="flex-1 d-flex center-child-xy">
                        <WaveformSelector
                            onChangeWaveForm={props.setWaveform}
                        />
                    </div>
                </div>
                <div className="flex-1 d-flex-col">
                    <div className="d-flex center-child-xy header-item">
                        Detune
                    </div>
                    <div className="flex-1 d-flex center-child-xy">
                        <DetuneSelector
                            detune={oscData.detune}
                            onChangeDetune={props.setDetune}
                        />
                    </div>
                </div>
                <div className="flex-1 d-flex-col">
                    <div className="d-flex center-child-xy header-item">
                        Phase
                    </div>
                    <div className="flex-1 knob-container">
                        <Knob
                            isOn={oscData.isOn}
                            size={40}
                            updateOscData={data => props.updateOscData(data)}
                            value={oscData.phase}
                        />
                    </div>
                </div>
                <div className="flex-1 d-flex-col">
                    <div className="d-flex center-child-xy header-item">
                        Gain
                    </div>
                    <div className="flex-1 knob-container">
                        <Knob
                            isOn={oscData.isOn}
                            size={40}
                            updateOscData={data => props.updateOscData(data)}
                            value={oscData.gain}
                        />
                    </div>
                </div>
                <div className="flex-1 d-flex-col pan-container">
                    <div className="d-flex center-child-xy header-item">
                        Pan
                    </div>
                    <div className="flex-1 knob-container">
                        <Knob
                            isOn={oscData.isOn}
                            size={40}
                            updateOscData={data => props.updateOscData(data)}
                            value={oscData.pan}
                        />
                    </div>
                </div>

                <div className="flex-1 d-flex-col">
                    <div className="d-flex center-child-xy header-item">
                        Signal
                    </div>
                    <div className="flex-1 d-flex center-child-x">
                        <div className="d-flex h-100">
                            <div className="flex-1 signal-seperator">
                                <Signal
                                    isSelected={props.isSelected}
                                    hasSignal={props.signal}
                                />
                            </div>
                            <div className="flex-1 signal-seperator">
                                <Signal
                                    isSelected={props.isSelected}
                                    hasSignal={props.signal}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <SettingsRack
                partials={[...partials]}
                setPartials={setPartials}
                height={90}
                width={268}
            ></SettingsRack>
        </div>
    );
}
