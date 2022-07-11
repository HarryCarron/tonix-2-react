import { useState, useCallback } from 'react';
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

    const setFilter = useCallback(
        data => setPingPong(currentPP => ({ ...currentPP, ...data })),
        []
    );

    return (
        <div className="d-flex">
            <div>
                <BandPass
                    gain={pingPong.gain}
                    freq={pingPong.freq}
                    q={pingPong.q}
                    setFilter={setFilter}
                ></BandPass>
            </div>

            <div className="d-flex space-around knobs">
                <div>
                    <div className="bold property-label d-flex center-child-x">
                        Time
                    </div>
                    <Knob
                        arcWidth={3}
                        isOn={true}
                        color={'white'}
                        size={30}
                        value={0}
                    />
                </div>
                <div>
                    <div className="bold property-label d-flex center-child-x">
                        Feedback
                    </div>
                    <Knob
                        arcWidth={3}
                        isOn={true}
                        color={'white'}
                        size={30}
                        value={0}
                    />
                </div>
                <div>
                    <div className="bold property-label d-flex center-child-x">
                        Wet
                    </div>
                    <Knob
                        arcWidth={3}
                        isOn={true}
                        color={'white'}
                        size={30}
                        value={0}
                    />
                </div>
            </div>
        </div>
    );
}
