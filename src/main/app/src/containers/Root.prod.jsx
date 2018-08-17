import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import App from './App.jsx';
import "semantic-ui-css/semantic.css";
import './index.css';

export default class Root extends Component {
    render() {
        const { store, history } = this.props;

        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <div id="app-react-spring">
                        <App/>
                    </div>
                </ConnectedRouter>
            </Provider>
        );
    }
}
