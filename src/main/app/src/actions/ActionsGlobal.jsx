import { About, Help, SignIn, SignUp, SignOut } from '../constants/ActionTypes'

export function showAbout() {
    return {
        type: About,
        text: "We are from Unipro"
    }
}

export function showHelp() {
    return {
        type: Help,
        text: "This is a help"
    }
}

export function signIn() {
    return {
        type: SignIn,
        text: "Please Sign in"
    }
}

export function signOut() {
    return {
        type: SignOut,
        text: "You can sign out"
    }
}

export function signUp() {
    return {
        type: SignUp,
        text: "Please register before sign in"
    }
}
