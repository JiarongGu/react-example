import { History } from 'history';
import * as React from 'react';
import { Route, Router } from 'react-router';
import { useSink } from 'redux-sink';
import { RouterSink } from './services/router';

import './styles/global.less';

export interface AppProps {
  history: History;
}

export const App: React.FunctionComponent<AppProps> = ({ history }) => {
  const router = useSink(RouterSink);

  return (
    <Router history={history}>
      {router.routes.map((route, index) => (
        <Route key={index} {...route.props} />
      ))}
    </Router>
  );
};
