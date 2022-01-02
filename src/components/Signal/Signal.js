import './Signal.css';
import React from 'react';

function Signal({hasSignal}){

    let style = {}

    if (hasSignal) {
        style = {height: '100%'}
    }

    return (
        <div className="h-100 d-flex center-child-x">
            <div className="inner-singal-container signal-container">
                <div className="signal" style={style}></div>
            </div>

        </div>
    );
};

export default React.memo(Signal);
