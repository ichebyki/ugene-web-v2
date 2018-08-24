import { _EMPTY_, About, Help, SignIn, SignUp, SignOut, LeftSideBar } from '../constants/ActionTypes';

/*export function clearActiveMenuBarItem() {
    return {
        type: _EMPTY_,
        activeMenuBarItem: "_EMPTY_",
        text: ""
    }
}*/
export const clearActiveMenuBarItem = () => ({ type: _EMPTY_,  activeMenuBarItem: _EMPTY_,     text: "" });
export const showAbout = () => ({ type: About,  activeMenuBarItem: "About",     text: "We are from Unipro" });
export const showHelp = () => ({ type: Help,    activeMenuBarItem: "showHelp",  text: "This is a help" });
export const signIn = () => ({ type: SignIn,    activeMenuBarItem: "signIn",    text: "Please Sign in" });
export const signOut = () => ({ type: SignOut,  activeMenuBarItem: "signOut",   text: "You can sign out" });
export const signUp = () => ({ type: SignUp,    activeMenuBarItem: "signUp",    text: "Please register before sign in" });

export const showLeftSideBar = () => ({ type: LeftSideBar });
