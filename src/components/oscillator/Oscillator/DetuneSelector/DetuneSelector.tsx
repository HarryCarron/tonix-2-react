import { ChangeEvent, ReactElement } from 'react';
import './DetuneSelector.css';

interface DetuneSelectorProps {
  detune: number;
  onChangeDetune: (d: number) => number;
}

function DetuneSelector({ detune, onChangeDetune }: DetuneSelectorProps): ReactElement<DetuneSelectorProps> {
  const detuneChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const detune = parseInt(event.currentTarget!.value);
    onChangeDetune(detune);
  };

  return (
    <div className='flex-1 d-flex center-child-xy'>
      <input step='.1' type='number' value={detune} onChange={detuneChanged} className='w-100 selector' />
    </div>
  );
}

export default DetuneSelector;
