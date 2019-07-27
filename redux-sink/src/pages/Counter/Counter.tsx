import { Button, InputNumber } from 'antd';
import * as classNames from 'classnames';
import * as React from 'react';
import { useSink } from 'redux-sink';

import { CounterSink } from './CounterSink';

import * as styles from './Counter.module.less';

export const Counter = () => {
  const counter = useSink(CounterSink);

  return (
    <div>
      <h2>Simple Counter</h2>
      <div className={styles.counter}>
        <div className={styles.row}>
          <strong>Base: {counter.base}, Counter Value: {counter.value}</strong>
        </div>
        <div className={classNames(styles.row, styles.buttons)}>
          <Button className={styles.button} onClick={counter.minus}>-</Button>
          <InputNumber defaultValue={counter.base} onChange={counter.updateBase} />
          <Button className={styles.button} onClick={counter.add}>+</Button>
        </div>
      </div>
    </div>
  );
};
