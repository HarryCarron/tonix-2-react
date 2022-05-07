import React from 'react';
import GlobalEventHandlers from './../../Utilities/GlobalEventHandlers';
import './Knob.css';

function Knob({ value, size, updateOscData }) {
  var container;

  var initialY;

  var globalEventHandlers = new GlobalEventHandlers();

  const knobLineWidth = 5;

  const mouseMoving = (e) => {
    var currentY = (initialY - e.clientY) / 100;

    if (currentY >= 0 && currentY <= 1) {
      updateOscData({ phase: currentY });
    }
  };

  const onMouseDown = (e) => {
    initialY = e.clientY;
    globalEventHandlers.initiate(mouseMoving);
  };

  return (
    <div className='d-flex-col'>
      <div className='flex-1 center-child-xy' ref={container} onMouseDown={($event) => onMouseDown($event)}>
        <svg height={size} width={size}>
          <g>
            <circle cx={size / 2} cy={size / 2} r='19' strokeWidth='1' fill='#1e1e1e' />
          </g>

          <g className='grabbable rotating-component' style={{ transform: `rotate(${30 + value * 300}deg)` }}>
            <circle cx={size / 2} cy={size / 2} r='13' fill='#32303d' strokeWidth='6' />
            <rect x={size / 2 - knobLineWidth / 2} y={size / 2} width={knobLineWidth} stroke='#fffd47' strokeWidth='1' height='10' rx='3' style={{ fill: '#fffd47' }} />
          </g>
        </svg>
      </div>

      <div className='d-flex center-child-xy input-container'>
        <input value={value.toFixed(1)} className='selector knob-input' readOnly />
      </div>
    </div>
  );
}

export default React.memo(Knob);
