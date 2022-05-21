import { useState } from 'react';
import '../effect.css';
import './PingPongDelay.css';
import Knob from '../../Knob/Knob';
import BandPass from '../../VisualisedFilters/BandPass/BandPass';

export default function PingPongDelay() {
    const [pingPong, setPingPong] = useState({
        gain: 0.5,
        freq: 0.5,
        q: 0.5,
    });

    const setFilter = data => {
        setPingPong(currentPP => {
            return { ...currentPP, ...data };
        });
    };

    return (
        <div className="d-flex-col">
            <BandPass
                gain={pingPong.gain}
                freq={pingPong.freq}
                q={pingPong.q}
                setFilter={setFilter}
            ></BandPass>
            <div className="d-flex space-around knobs">
                <div>
                    <div className="bold property-label d-flex center-child-x">
                        Delay Time
                    </div>
                    <Knob
                        isOn={true}
                        size={40}
                        updateOscData={data => {}}
                        value={0}
                    ></Knob>
                </div>
                <div>
                    <div className="bold property-label d-flex center-child-x">
                        Feedback
                    </div>
                    <Knob
                        isOn={true}
                        size={40}
                        updateOscData={data => {}}
                        value={0}
                    ></Knob>
                </div>
                <div>
                    <div className="bold property-label d-flex center-child-x">
                        Wet
                    </div>
                    <Knob
                        isOn={true}
                        size={40}
                        updateOscData={data => {}}
                        value={0}
                    ></Knob>
                </div>
            </div>
        </div>
    );
}
