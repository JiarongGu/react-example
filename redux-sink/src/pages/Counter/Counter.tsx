import * as React from 'react';
import { useSink } from 'redux-sink';
import { CounterSink } from './CounterSink';

export const Counter = () => {
  const counter = useSink(CounterSink);

  return (
    <div>
      <h2>Simple Counter</h2>
      <p>Value: {counter.value}</p>
      <button onClick={() => counter.add(1)}>+</button>
      <button onClick={() => counter.add(-1)}>-</button>
    </div>
  );
};
