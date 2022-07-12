import React, { useState } from 'react';
import OscillatorSelector from './DetuneSelector/OscillatorSelector/OscillatorSelector';
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

    return (
        <div className="oscillator">
            <div className="d-flex-col">
                <div className="d-flex controls-row">
                    <div className="flex-1 d-flex-col d-flex center-child-xy">
                        <div className="flex-1 d-flex center-child-xy">
                            <LED isOn={true}></LED>
                        </div>
                        <div className="flex-1 d-flex center-child-xy osc-number">
                            {props.number}
                        </div>
                    </div>

                    <div className="flex-1 d-flex-col control-container">
                        <div className="d-flex center-child-xy header-item">
                            Waveform
                        </div>
                        <div className="flex-1 d-flex-col">
                            <div className="flex-1 d-flex center-child-xy">
                                <OscillatorSelector
                                    onChangeWaveForm={props.setWaveform}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 d-flex-col control-container">
                        <div className="d-flex center-child-xy header-item">
                            Phase
                        </div>
                        <div className="flex-1 knob-container">
                            <Knob
                                arcWidth={2}
                                isOn={oscData.isOn}
                                color={'white'}
                                size={25}
                                updateOscData={data =>
                                    props.updateOscData(data)
                                }
                                value={oscData.phase}
                            />
                        </div>
                    </div>
                    <div className="flex-1 d-flex-col control-container">
                        <div className="d-flex center-child-xy header-item">
                            Gain
                        </div>
                        <div className="flex-1 knob-container">
                            <Knob
                                arcWidth={2}
                                isOn={oscData.isOn}
                                color={'white'}
                                size={25}
                                updateOscData={data =>
                                    props.updateOscData(data)
                                }
                                value={oscData.gain}
                            />
                        </div>
                    </div>
                    <div className="flex-1 d-flex-col pan-container control-container">
                        <div className="d-flex center-child-xy header-item">
                            Pan
                        </div>
                        <div className="flex-1 knob-container">
                            <Knob
                                arcWidth={2}
                                isOn={oscData.isOn}
                                color={'white'}
                                size={25}
                                updateOscData={data =>
                                    props.updateOscData(data)
                                }
                                value={oscData.pan}
                            />
                        </div>
                    </div>

                    <div className="flex-1 d-flex-col control-container">
                        <div className="d-flex center-child-xy header-item">
                            Signal
                        </div>
                        <div className="flex-1 d-flex center-child-x">
                            <div className="d-flex h-100 ">
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
            </div>
        </div>
    );
}
