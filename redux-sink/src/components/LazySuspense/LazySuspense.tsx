import { Spin } from 'antd';
import * as React from 'react';

import * as styles from './LazySuspense.module.less';

export const LazySuspense: React.FunctionComponent = ({ children }) => {
  return (
    <React.Suspense 
      fallback={
        <div className={styles.container}>
          <Spin tip={'Loading...'} />
        </div>
      }
    >
      {children}
    </React.Suspense>
  );
}