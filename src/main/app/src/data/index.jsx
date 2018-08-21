import { combineReducers } from "redux";
import type { Dispatch } from 'redux';

import { routerReducer } from "react-router-redux";

import auth from './modules/auth';
import websockets from './modules/websockets';
import books from './modules/books';
import ugeneMenuBar from './ugene/ReducerMenuBar';

const rootReducer = combineReducers({
    router: routerReducer,
    auth,
    websockets,
    books,
    ugeneMenuBar
});

export default rootReducer;

export type Thunk<A> = (dispatch: Dispatch<A>, getState: () => Object) => any;