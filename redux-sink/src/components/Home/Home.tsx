import * as React from 'react';
import { Link } from 'react-router-dom';
import { useSink } from 'redux-sink';

import { RouterSink } from '@services/router';

export const Home = () => {
  const router = useSink(RouterSink);

  return (
    <div>
      <h1>Home</h1>
      <ul>
        {router.routes.map(
          (route) =>
            route.link && (
              <Link key={route.name} to={route.link}>
                {route.name}
              </Link>
            )
        )}
      </ul>
    </div>
  );
};
