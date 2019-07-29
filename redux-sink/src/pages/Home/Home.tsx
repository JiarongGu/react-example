import * as React from 'react';
import { Link } from 'react-router-dom';
import { useSink } from 'redux-sink';

import { RouterSink } from '@services/router/RouterSink';
import * as styles from './Home.module.less';

export const Home = () => {
  const router = useSink(RouterSink);

  return (
    <div>
      <h2>Introduction to Redux Sink</h2>
      <h3>Current Routes</h3>
      <ul className={styles.routeList}>
        {router.routes.map(
          (route) =>
            route.link && (
              <li key={route.key}>
                <Link to={route.link}>{route.name}</Link>
              </li>
            )
        )}
      </ul>
    </div>
  );
};
