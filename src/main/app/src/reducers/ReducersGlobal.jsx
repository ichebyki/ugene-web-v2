import { combineReducers } from 'redux'
import { About, Help, SignIn, SignUp, SignOut } from '../constants/ActionTypes'

function showGlobalWindows(state = {}, action) {
    switch (action.type) {
        case About:
        case Help:
            return action.text;
        default:
            return state;
    }
}
​
function sign(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ]
        case TOGGLE_TODO:
            return state.map((todo, index) => {
                if (index === action.index) {
                    return Object.assign({}, todo, {
                        completed: !todo.completed
                    })
                }
                return todo
            })
        default:
            return state
    }
}
​
const todoApp = combineReducers({
    visibilityFilter,
    todos
})
​
export default todoApp