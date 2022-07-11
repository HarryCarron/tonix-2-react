import './Signal.css';
import React from 'react';

function Signal({ hasSignal, isOn }) {
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
