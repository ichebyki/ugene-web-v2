import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App.jsx';
import "semantic-ui-css/semantic.css";
import './App.css';
import DevTools from "../utils/DevTools";


class Root extends Component {
    render() {
        const { store, persistor, history } = this.props;
        const needDevTools = ! (process.env.NODE_ENV === 'production' || typeof window.devToolsExtension === "function");

        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <PersistGate loading={null} persistor={persistor}>
                        <div id="ugene-app-react-spring" className={'ugene-app-react-spring'}>
                            <App/>
                        </div>
                        <div>
                            {needDevTools ? <DevTools /> : <div />}
                        </div>
                    </PersistGate>
                </ConnectedRouter>
            </Provider>
        );
    }
}

export default Root;
