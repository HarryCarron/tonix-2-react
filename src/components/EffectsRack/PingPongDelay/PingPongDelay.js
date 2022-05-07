import '../effect.css';
import './PingPongDelay.css';
import Knob from '../../Knob/Knob';

export default function PingPongDelay() {
    return (
        <div className="d-flex space-around">
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
    );
}
