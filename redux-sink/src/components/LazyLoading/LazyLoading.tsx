import { Spin } from 'antd';
import * as React from 'react';

import * as styles from './LazyLoading.module.less';

export const LazyLoading = (props) => {
  if (props.error) {
    return <div>Error! <button onClick={ props.retry }>Retry</button></div>;
  }
  
  return (
    <div className={styles.container}>
      <Spin tip={'Loading...'} />
    </div>
  );
}