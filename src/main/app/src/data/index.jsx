import { combineReducers } from "redux";
import type { Dispatch } from 'redux';

import { routerReducer } from "react-router-redux";

import auth from './modules/auth';
import websockets from './modules/websockets';
import books from './modules/books';
import ugeneMenuBar from './ugene/ReducerMenuBar';
import ugeneTabs from './ugene/ReducerTabs';

const appReducer = combineReducers({
    router: routerReducer,
    auth,
    websockets,
    books,
    ugeneMenuBar,
    ugeneTabs
});

const rootReducer = (state, action) => {
    if (action.type === 'LOGGED_OUT') {
        const { router } = state;
        state = { router };
    }

    return appReducer(state, action);
};

export default rootReducer;

export type Thunk<A> = (dispatch: Dispatch<A>, getState: () => Object) => any;