import './Oscillator.css';
import React from 'react';
import Oscillator from './Oscillator';

function OscillatorContainer(props) {

  return (<Oscillator 
                    { ...props }
                  />);
  
}

export default React.memo(OscillatorContainer, (newState, oldState) => ['data', 'isSelected', 'signal'].every(k => newState[k] === oldState[k]));