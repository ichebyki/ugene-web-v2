import * as UgeneActions from '../../constants/ActionTypes';

const initialState = {
    tabkey: 1,
    tabs: [{
        key: 1,
        icon: 'home',
        name: 'Home',
        type: 'HOME',
        desc: 'This is a pane "Home"',
        pane: 'default',
    }]
};

export default function ReducerTabs(state = initialState, action) {

    if (action.type === UgeneActions.UgeneWindowAction) {
        if (action.command === UgeneActions.UgeneWindow.CREATE) {
            const tabkey = state.tabkey ? state.tabkey + 1 : 1;
            const tab = {
                key: tabkey,
                icon: 'sitemap',
                name: "Tab " + tabkey,
                type: 'WORKFLOW',
                desc: 'This is a content of the "Tab ' + tabkey + '"',
                pane: 'WORKFLOW',
            };

            if (state.tabs) {
                return {
                    ...state,
                    tabkey: tabkey,
                    tabs: [...state.tabs, tab]
                }
            } else {
                return {
                    ...state,
                    tabkey: tabkey,
                    tabs: [tab]
                }
            }
        }
        else if (action.command === UgeneActions.UgeneWindow.DELETE) {
            if (action.tabkey && action.tabkey > 0 && action.tabkey <= state.tabkey) {
                return {
                    ...state,
                    tabs: state.tabs.filter(tab => tab.key != action.tabkey)
                }
            }
            else {
                console.warn("Wrong tab key value '" + action.tabkey + "' while deleting tab");
            }
        }
    }
    return state;
}