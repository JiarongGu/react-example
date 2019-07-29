import { Button, InputNumber } from 'antd';
import * as classNames from 'classnames';
import * as React from 'react';
import { effect, useSink } from 'redux-sink';
import { sink, state, trigger } from 'redux-sink';

import { ActiveRoute } from '@services/navigation/NavigationSink';
import * as styles from './Counter.module.less';

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

export default () => {
  const counter = useSink(CounterSink);
  return (
    <div>
      <div className={styles.counter}>
        <div className={styles.row}>
          <strong>
            Base: {counter.base}, Counter Value: {counter.value}
          </strong>
        </div>
        <div className={classNames(styles.row, styles.buttons)}>
          <Button className={styles.button} onClick={() => (counter.value -= counter.base)}>
            -
          </Button>
          <InputNumber value={counter.base} onChange={(value) => (counter.base = value || 0)} />
          <Button className={styles.button} onClick={() => (counter.value += counter.base)}>
            +
          </Button>
        </div>
        <div className={styles.row}>
          <Button onClick={counter.reset}>Reset</Button>
        </div>
      </div>
    </div>
  );
};
