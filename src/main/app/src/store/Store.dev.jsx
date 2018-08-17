import {createStore, applyMiddleware, compose} from "redux";
import {routerMiddleware} from "react-router-redux";
import thunk from "redux-thunk";
import createHistory from "history/createBrowserHistory";
import rootReducer from "../data/index";
import {wsMiddleware} from '../middleware/wsMiddleware';
import DevTools from '../utils/DevTools'

export const history = createHistory();

const initialState = {};
const enhancers = [];
const middleware = [wsMiddleware, thunk, routerMiddleware(history)];

if (process.env.NODE_ENV === "development") {
    const devToolsExtension = window.devToolsExtension;

    if (typeof devToolsExtension === "function") {
        enhancers.push(devToolsExtension());
    }
    else {
        enhancers.push(DevTools.instrument());
    }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

export default createStore(rootReducer, initialState, composedEnhancers);
