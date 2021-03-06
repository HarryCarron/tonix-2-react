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
            <select onChange={waveFormChanged} className="input-container">
                {['SIN', 'SAW', 'SQR'].map((wave, i) => (
                    <option key={i} value={i}>
                        {wave}
                    </option>
                ))}
            </select>
            <div className="d-flex center-child-xy header-item">Detune</div>
            <input
                value={tune}
                type="text"
                className="input-container text-center"
            />
        </div>
    );
}

export default OscillatorSelector;
