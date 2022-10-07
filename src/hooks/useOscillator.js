import * as Tone from 'tone';
import { useEffect } from 'react';

export default function useOscillator() {

    const oscillator = useRef();

    useEffect(() => {
        oscillator.current = new Tone.Oscillator(440, "square").toDestination();
    }, []);

}