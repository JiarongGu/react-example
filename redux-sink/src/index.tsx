import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import { SinkFactory } from 'redux-sink';

import { App } from './App';
import { createNavigationHistory } from './services/navigation';

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
