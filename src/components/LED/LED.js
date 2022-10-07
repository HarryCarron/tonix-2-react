import './LED.css';
import React from 'react';

function LED({ isOn, updateOscData }) {
  let classes = 'pointer led ';
  classes += isOn ? 'is-on' : '';
  return <div onClick={() => updateOscData({ isOn: !isOn })} className={classes}></div>;
}

export default React.memo(LED);
