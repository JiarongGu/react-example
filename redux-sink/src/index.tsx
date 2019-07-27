import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import { SinkFactory } from 'redux-sink';

import { createNavigationHistory } from '@services/navigation';
import { RouterSink } from '@services/router';
import { App } from './App';

const store = SinkFactory.createStore({
  devtoolOptions: { devToolCompose: composeWithDevTools }
});
const history = createNavigationHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
