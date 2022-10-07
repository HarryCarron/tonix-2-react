import React, { useEffect, useState, useMemo } from 'react';
import OscillatorSelector from './DetuneSelector/OscillatorSelector/OscillatorSelector';
import DetuneSelector from './DetuneSelector/DetuneSelector';
import Knob from '../../Knob/Knob';
import LED from '../../LED/LED';
import OscillatorControls from './OscillatorControls/OscillatorControls'
import SettingsRack from './SettingsRack/SettingsRack';
import * as Tone from 'tone'

export default function Oscillator(props) {

    const oscillator = useMemo(() => 
        new Tone.Oscillator(440, "square").toDestination()
    , []);
    

    useEffect(() => {}, []);

    function playNote() {
        oscillator.start();
        setTimeout(() => oscillator.stop(), 500);
    }


    const [oscData, setOscData] = useState({
        phase: 0,
        gain: 1,
        pan: 0.5,
        isOn: true,
        waveForm: 1,
        detune: 0,
    });


    useEffect(() => {
        console.log(oscData.phase * 1000);
        oscillator.phase = oscData.phase * 100;
    }, [oscData, oscillator]);


    const updateOscData = (newData) => {

        setOscData((state) => ({
            ...state,
            phase: newData.phase
        }))
    }


    return (
        <div className="oscillator" onClick={() => playNote()}>
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

            <OscillatorControls updateOscData={updateOscData}></OscillatorControls>
            
        </div>
    );
}
