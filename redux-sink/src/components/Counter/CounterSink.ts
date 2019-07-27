import { effect, sink, state } from 'redux-sink';

@sink('counter')
export class CounterSink {
  @state public value = 0;

  @effect
  public add(value: number) {
    this.value += value;
  }
}