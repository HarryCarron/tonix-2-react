import './Oscillator.css';
import Oscillator, { OscillatorProps } from './Oscillator';

export default function OscillatorContainer(props: OscillatorProps) {
    return <Oscillator {...props} />;
}

// export default React.memo(OscillatorContainer, (newState, oldState) =>
//     ['data', 'isSelected', 'signal'].every(k => newState[k] === oldState[k])
// );
