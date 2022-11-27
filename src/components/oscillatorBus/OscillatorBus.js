import Oscillator from '../oscillator/Oscillator/Oscillator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faWaveSquare } from '@fortawesome/free-solid-svg-icons';

export default function OscillatorBus() {
    return (
        <div className="synth shadow-4">
            <div className="d-flex">
                <div className="h-100 oscillator-area">
                    <div className="oscillator-title d-flex">
                        <div>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </div>
                        <div className="flex-1 d-fle center-child-xy ">
                            <FontAwesomeIcon
                                className="osc-icon"
                                icon={faWaveSquare}
                            />
                            Oscillator Bus
                        </div>

                        <div>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </div>
                    </div>

                    <div>
                        {[1, 2, 3].map(number => (
                            <Oscillator number={number} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
