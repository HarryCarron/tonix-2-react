import './Signal.css';
import React, { ReactElement } from 'react';

interface SignalProps {
    hasSignal: boolean;
    isOn: boolean; // todo persist in context: task #12
}

function Signal({ hasSignal, isOn }: SignalProps): ReactElement<SignalProps> {
    let style = {};
    let signalClass = 'signal ';

    if (hasSignal) {
        style = { height: '100%' };
    }

    console.log(hasSignal);

    return (
        <div className="h-100 d-flex center-child-x">
            <div className="inner-singal-container signal-container">
                <div className={signalClass} style={style}></div>
            </div>
        </div>
    );
}

export default React.memo(Signal);
