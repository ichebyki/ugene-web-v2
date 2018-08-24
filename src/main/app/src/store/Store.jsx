import {createStore, applyMiddleware, compose} from "redux";
import {routerMiddleware} from "react-router-redux";
import thunk from "redux-thunk";

import rootReducer from "../data/index";
import {wsMiddleware} from '../middleware/wsMiddleware';
import DevTools from "../utils/DevTools";


const initialState = {};
const enhancers = [];
const middleware = [wsMiddleware, thunk, routerMiddleware(history)];

if (process.env.NODE_ENV === "development") {
    const devToolsExtension = window.devToolsExtension;

    if (process.env.NODE_ENV !== 'production'
        && typeof devToolsExtension !== "function")
    {
        enhancers.push(DevTools.instrument());
    } else {
        enhancers.push(devToolsExtension());
    }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

export default createStore(rootReducer, initialState, composedEnhancers);
