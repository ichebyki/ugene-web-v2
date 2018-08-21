import { _EMPTY_, About, Help, SignIn, SignUp, SignOut } from '../../constants/ActionTypes';

const initialState = {
}

export default function ReducerMenuBar(state = initialState, action) {

    switch (action.type) {
        case About:
        case Help:
        case SignIn:
        case SignOut:
        case SignUp:
            return { ...state, activeMenuBarItem: action.type };

        case _EMPTY_:
            return { ...state, activeMenuBarItem: action.type };

        default:
            return state;
    }

}