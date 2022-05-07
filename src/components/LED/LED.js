import './LED.css';
import React from 'react';

function LED({ isOn, updateOscData }) {
  // console.log('<led/> rendered');
  let classes = 'pointer led ';
  classes += isOn ? 'is-on' : '';
  return <div onClick={() => updateOscData({ isOn: !isOn })} className={classes}></div>;
}

export default React.memo(LED);
