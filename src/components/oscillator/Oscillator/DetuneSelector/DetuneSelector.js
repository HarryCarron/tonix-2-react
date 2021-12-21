
import './DetuneSelector.css';


function DetuneSelector({detune, onChangeDetune}) {

    const detuneChanged = (event) => {
        const waveform = parseInt(event.currentTarget.value);
        onChangeDetune(waveform);
    }

    return (
        <div className="flex-1 d-flex center-child-xy">
            <input step=".1" type="number" value={detune} onChange={detuneChanged} className="detune selector"/>
        </div>
    )

}

export default DetuneSelector;