import * as React from 'react';
import { Route } from 'react-router';
import { useSink } from 'redux-sink';

import { NavigationSink } from '@services/navigation/NavigationSink';

export interface RouteContentProps {
  routeKey?: string;
  root?: boolean;
}

export const RouteContent: React.FunctionComponent<RouteContentProps> = ({ routeKey, root }) => {
  const navigation = useSink(NavigationSink);
  
  if (!routeKey && !root)
    return null;

  const routes = root ? navigation.routes : navigation.routeMap[routeKey!].routes;
  return (
    <>
      {routes &&
        routes.map((route, index) => <Route key={index} path={route.link} {...route.props} />)}
    </>
  );
};
