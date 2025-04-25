import './LED.css';
import React, { ReactElement } from 'react';

interface LEDProps {
  isOn: boolean;

}

function LED({ isOn }: LEDProps): ReactElement<LEDProps> {
  let classes = 'pointer led ';
  classes += isOn ? 'is-on' : '';
  return <div className={classes}></div>;
}

export default React.memo(LED);
