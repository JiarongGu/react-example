import { effect } from 'redux-sink';
import { sink, state, trigger } from 'redux-sink';

import { ActiveRoute } from '@services/navigation/models/ActiveRoute';

@sink('counter')
export class CounterSink {
  @state public value = 0;
  @state public base = 1;

  @effect
  public reset() {
    this.value = 0;
    this.base = 1;
  }

  // reset counter on route enter
  @trigger('navigation/activeRoute')
  public triggerActiveRoute(activeRoute: ActiveRoute) {
    if (activeRoute.keys.some((key) => key === 'counter')) this.reset();
  }
}