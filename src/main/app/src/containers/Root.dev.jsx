import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import DevTools from '../utils/DevTools'
import App from './App.jsx';

export default class Root extends Component {
    render() {
        const { store, history } = this.props;

        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <div id="app-react-spring">
                        <App/>
                        <DevTools/>
                    </div>
                </ConnectedRouter>
            </Provider>
        );
    }
}