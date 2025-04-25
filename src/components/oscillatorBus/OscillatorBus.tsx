import React, { ReactElement } from 'react';
import Oscillator from '../oscillator/Oscillator/Oscillator';

export default function OscillatorBus(): ReactElement {
    return (
        <div className="synth">
            <div className="d-flex">
                <div className="h-100 oscillator-area">
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
