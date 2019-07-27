import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { SinkFactory } from 'redux-sink';

import { App } from './App';
import { createNavigationHistory } from './services/navigation';

const store = SinkFactory.createStore();
const history = createNavigationHistory();

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('root')
);
