import { effect, sink, state, trigger } from 'redux-sink';

import { ActiveRoute } from '@services/navigation';

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

  @trigger('navigation/activeRoute')
  public triggerActiveRoute(activeRoute: ActiveRoute) {
    if(activeRoute.keys.some(key => key === 'counter')) {
      this.value = 0;
      this.base = 1;
    }
  }
}