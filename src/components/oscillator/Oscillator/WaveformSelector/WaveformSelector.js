import './WaveformSelector.css';

function WaveformSelector({onChangeWaveForm}) {

    const waveFormChanged = (event) => {
        const waveform = parseInt(event.currentTarget.value);
        onChangeWaveForm(waveform);
    }

    return (
        <>
            <div>
                <select onChange={waveFormChanged} className="selector">
                    {
                        ['Sine', 'Saw', 'Square'].map((wave, i) => (<option key={i} value={i}> {wave} </option>))
                    }
                </select>
            </div>
        </>
    );
}

export default WaveformSelector;