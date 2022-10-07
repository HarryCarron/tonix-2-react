import OscillatorSelector from '../DetuneSelector/OscillatorSelector/OscillatorSelector'
import Knob from '../../../Knob/Knob'
import Signal from './../../../Signal/Signal';

export default function OscillatorControls({updateOscData}) {


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
                                isOn={true}
                                color={'#DCDCDC'}
                                size={22}
                                updateOscData={updateOscData}
                                value={true}
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
                                isOn={true}
                                color={'#DCDCDC'}
                                size={22}
                                updateOscData={() => null
                                    
                                }
                                value={true}
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
                                isOn={true}
                                color={'#DCDCDC'}
                                size={22}
                                updateOscData={
                                    () => null
                                }
                                value={true}
                            />
                        </div>
                    </div>

                    <div className="signal-container d-flex-col control-container">

                        <div className="flex-1 d-flex center-child-x">
                            <div className="d-flex h-100 ">
                                <div className="flex-1 signal-seperator">
                                    <Signal
                                        hasSignal={false}
                                    />
                                </div>
                                <div className="flex-1 signal-seperator">
                                    <Signal
                                        hasSignal={false}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
    )
}