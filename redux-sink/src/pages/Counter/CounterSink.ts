import { effect, sink, state } from 'redux-sink';

@sink('counter')
export class CounterSink {
  @state public value = 0;
  @state public base = 1;

  @effect
  public add() {
    this.value += this.base;
  }

  @effect
  public minus() {
    this.value -= this.base;
  }

  @effect
  public updateBase(value: number) {
    if (value) {
      this.base = value;
    } else {
      this.base = 1;
    }
  }
}