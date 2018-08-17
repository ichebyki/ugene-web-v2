import React from 'react';
import { render } from 'react-dom';

import store, { history } from './store/Store';
import Root from './containers/Root';
import "semantic-ui-css/semantic.css";
import './index.css';

const target = document.querySelector('#root');
render(
    <Root store={store} history={history}/>,
    target
);
