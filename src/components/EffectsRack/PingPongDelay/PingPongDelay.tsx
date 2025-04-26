import { useState, useCallback, ReactElement } from 'react';
import '../effect.css';
import './PingPongDelay.css';
import Knob from '../../RotaryControl/RotaryControl';
import BandPass from '../../VisualisedFilters/filter/Filter';
import { FilterValue } from '../../../shared/types/filter-value.types';

export default function PingPongDelay(): ReactElement {
    const [pingPong, setPingPong] = useState<FilterValue>({
        gain: 0.5,
        freq: 0.5,
        q: 0.5,
    });

    const setFilter = useCallback(
        (data: FilterValue) =>
            setPingPong(currentFilterValue => {
                return {
                    ...currentFilterValue,
                    ...data,
                };
            }),
        []
    );

    return (
        <div className="d-flex-col ping-pong-delay">
            <div className="d-flex space-around knobs">
                <div className="control-container">
                    <div className="bold header-item d-flex center-child-x">
                        Time
                    </div>
                    <Knob
                        arcWidth={3}
                        color={'white'}
                        size={20}
                        value={0}
                    />
                </div>
                <div className="control-container">
                    <div className="bold header-item d-flex center-child-x">
                        Feedback
                    </div>
                    <Knob
                        arcWidth={3}
                        color={'white'}
                        size={20}
                        value={0}
                    />
                </div>
                <div className="control-container">
                    <div className="bold header-item d-flex center-child-x">
                        Wet
                    </div>
                    <Knob
                        arcWidth={3}
                        color={'white'}
                        size={20}
                        value={0}
                    />
                </div>
            </div>
        </div>
    );
}
