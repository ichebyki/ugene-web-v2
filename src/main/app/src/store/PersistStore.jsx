import {createStore, applyMiddleware, compose} from "redux";
import {routerMiddleware} from "react-router-redux";
import thunk from "redux-thunk";
import createHistory from "history/createBrowserHistory";

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
//import storage from 'redux-persist/lib/storage/session';

import rootReducer from "../data/index";
import {wsMiddleware} from '../middleware/wsMiddleware';
import DevTools from "../utils/DevTools";


export const history = createHistory();

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
const persistConfig = {
    key: 'root',
    storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, initialState, composedEnhancers);
export const persistor = persistStore(store);

export default () => {
    return { store, persistor, history };
}
