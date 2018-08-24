import React from 'react';
import { render } from 'react-dom';

//import store from './store/Store';
import { store, persistor, history } from './store/PersistStore';

import Root from './containers/Root';
import "semantic-ui-css/semantic.css";
import './index.css';

const target = document.querySelector('#root');

render(
    <Root store={store} persistor={persistor} history={history} />,
    target
);
