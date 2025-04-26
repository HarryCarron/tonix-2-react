import OscillatorSelector from '../../../shared/oscillator-selector/oscillator-selector';
import Knob from '../../../shared/rotary-control/rotary-control'
import Signal from '../../../shared/signal/signal';
import { ReactElement } from 'react';

export default function OscillatorControls(): ReactElement {


    return (
        <div className="d-flex-col">
                <div className="d-flex controls-row">

                    <div className="flex-1 d-flex-col control-container">
                        <div className="d-flex center-child-xy header-item">
                            Waveform
                        </div>
                        <div className="flex-1 d-flex-col">
                            <div className="flex-1 d-flex center-child-xy">
                                <OscillatorSelector
                                    onChangeWaveForm={() => null}
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
                                arcWidth={3}
                                color={'#DCDCDC'}
                                size={22}
                                value={0}
                            />
                        </div>
                    </div>
                    <div className="flex-1 d-flex-col control-container">
                        <div className="d-flex center-child-xy header-item">
                            Gain
                        </div>
                        <div className="flex-1 knob-container">
                            <Knob
                                arcWidth={3}
                                color={'#DCDCDC'}
                                size={22}
                                value={0}
                            />
                        </div>
                    </div>
                    <div className="flex-1 d-flex-col pan-container control-container">
                        <div className="d-flex center-child-xy header-item">
                            Pan
                        </div>
                        <div className="flex-1 knob-container">
                            <Knob
                                arcWidth={3}
                                color={'#DCDCDC'}
                                size={22}
                                value={0}
                            />
                        </div>
                    </div>

                    <div className="signal-container d-flex-col control-container">

                        <div className="flex-1 d-flex center-child-x">
                            <div className="d-flex h-100 ">
                                <div className="flex-1 signal-seperator">
                                    <Signal
                                        hasSignal={false}
                                        isOn={true}
                                    />
                                </div>
                                <div className="flex-1 signal-seperator">
                                    <Signal
                                        hasSignal={false}
                                        isOn={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
    )
}