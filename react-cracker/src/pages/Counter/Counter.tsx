import { Button, InputNumber } from 'antd';
import classNames from 'classnames';
import * as React from 'react';
import { useSink } from 'redux-sink';

import * as styles from './Counter.module.less';
import { CounterSink } from './CounterSink';

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
