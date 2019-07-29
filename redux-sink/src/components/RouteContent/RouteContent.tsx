import * as React from 'react';
import { Route } from 'react-router';
import { useSink } from 'redux-sink';

import { RouterSink } from '@services/router/RouterSink';

export interface RouteContentProps {
  routeKey?: string;
}

export const RouteContent: React.FunctionComponent<RouteContentProps> = ({ routeKey }) => {
  const router = useSink(RouterSink);
  const routes = routeKey ? router.routeMap[routeKey].routes : router.routes;

  return (
    <>
      {routes &&
        routes.map((route, index) => <Route key={index} path={route.link} {...route.props} />)}
    </>
  );
};
