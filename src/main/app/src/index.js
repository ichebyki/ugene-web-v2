import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store/store';
import App from './containers/App.jsx';

import "semantic-ui-css/semantic.css";
import './index.css';

const target = document.querySelector('#root');

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div id="app-react-spring">
          <App />
      </div>
    </ConnectedRouter>
  </Provider>,
  target
);
