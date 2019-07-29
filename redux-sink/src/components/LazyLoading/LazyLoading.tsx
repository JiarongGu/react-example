import { Button, Spin } from 'antd';
import * as React from 'react';
import { LoadingComponentProps } from 'react-loadable';

import * as styles from './LazyLoading.module.less';

export const LazyLoading: React.FunctionComponent<LoadingComponentProps> = (props) => {
  if (props.error) {
    return (
      <div>
        <h1>Loading Error</h1> 
        <Button onClick={ props.retry }>Retry</Button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Spin tip={'Loading...'} />
    </div>
  );
}