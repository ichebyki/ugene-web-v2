import {
    _EMPTY_,
    About,
    Help,
    SignIn,
    SignUp,
    SignOut,
    Profile,
    Settings,
    LeftSideBar,
    AppsAdd
} from '../../constants/ActionTypes';

const initialState = {
}

/* COMMAND or MENUITEM: add here */
export default function ReducerCommands(state = initialState, action) {

    switch (action.type) {
        /* MENUBAR */
        case About:
        case Help:
        case SignIn:
            return { ...state, activeMenuBarItem: action.type };

        /* RIGHT MENU */
        case SignOut:
        case SignUp:
        case Profile:
        case Settings:
            return { ...state, activeMenuBarItem: action.type };

        /* LEFT MENU */
        case LeftSideBar:
            return  { ...state,
                activeMenuBarItem: state.activeMenuBarItem === LeftSideBar ? _EMPTY_  : LeftSideBar};

        /* GENERAL COMMAND */
        case AppsAdd:
            return { ...state, activeMenuBarItem: AppsAdd, actionsEx: action['actionsEx']};

        case _EMPTY_:
            return { ...state, activeMenuBarItem: action.type };

        default:
            return state;
    }

}