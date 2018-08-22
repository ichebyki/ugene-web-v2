import * as actions from '../constants/ActionTypes';

export const createTab = () => ({
    type: actions.UgeneWindowAction,
    command: actions.UgeneWindow.CREATE/*,
    subType: actions.UgeneWindowStartUp*/
});

export const deleteTab = (tabKey) => ({
    type: actions.UgeneWindowAction,
    command: actions.UgeneWindow.DELETE,
    tabkey: tabKey
});
