import { _EMPTY_, About, Help, SignIn, SignUp, SignOut, Profile, Settings, LeftSideBar } from '../../constants/ActionTypes';

const initialState = {
}

export default function ReducerMenuBar(state = initialState, action) {

    switch (action.type) {
        case About:
        case Help:
        case SignIn:
        case SignOut:
        case SignUp:
        case Profile:
        case Settings:
            return { ...state, activeMenuBarItem: action.type };

        case LeftSideBar:
            return  { ...state,
                activeMenuBarItem: state.activeMenuBarItem === LeftSideBar ? _EMPTY_  : LeftSideBar};

        case _EMPTY_:
            return { ...state, activeMenuBarItem: action.type };

        default:
            return state;
    }

}