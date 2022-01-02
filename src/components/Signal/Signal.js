import './Signal.css';
import React from 'react';

function Signal({hasSignal, isSelected, isOn}){

    let style = {}
    let signalClass = 'signal ';

    if (hasSignal && isOn) {
        style = {height: '100%'}
    }
    if (!isSelected) {
        signalClass += 'not-selected';
    }

    return (
        <div className="h-100 d-flex center-child-x">
            <div className="inner-singal-container signal-container">
                <div className={signalClass} style={style}></div>
            </div>

        </div>
    );
};

export default React.memo(Signal);
