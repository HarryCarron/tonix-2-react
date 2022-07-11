import { useState } from 'react';
import './OscillatorSelector.css';

function OscillatorSelector({ onChangeWaveForm }) {
    const [tune, setTune] = useState(0.0);

    const waveFormChanged = event => {
        const waveform = parseInt(event.currentTarget.value);
        onChangeWaveForm(waveform);
    };

    return (
        <div className="osc-detune-container d-flex-col">
            <select
                onChange={waveFormChanged}
                className="selector osc-selector"
            >
                {['SIN', 'SAW', 'SQR'].map((wave, i) => (
                    <option key={i} value={i}>
                        {wave}
                    </option>
                ))}
            </select>
            <input
                value={tune}
                type="text"
                className="selector detune-selector"
            />
        </div>
    );
}

export default OscillatorSelector;
