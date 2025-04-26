import { ChangeEvent, ReactElement, useState } from 'react';
import './OscillatorSelector.css';

interface OscillatorSelectorProps {
    onChangeWaveForm: (w: number) => void;
}

function OscillatorSelector({
    onChangeWaveForm,
}: OscillatorSelectorProps): ReactElement<OscillatorSelectorProps> {
    const [tune, setTune] = useState(0.0);

    const waveFormChanged = (event: ChangeEvent<HTMLSelectElement>) => {
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
