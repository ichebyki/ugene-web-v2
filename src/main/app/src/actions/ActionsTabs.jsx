import * as actions from '../constants/ActionTypes';

export const openStartUp = () => ({
    type: actions.UgeneWindowAction,
    subType: actions.UgeneWindowStartUp,
    command: actions.UgeneWindow.CREATE
});

export const createTab = () => ({
    type: actions.UgeneWindowAction,
    command: actions.UgeneWindow.CREATE
});

export const closeTab = (tabKey) => ({
    type: actions.UgeneWindowAction,
    command: actions.UgeneWindow.DELETE,
    tabkey: tabKey
});

export const createWorkflow = () => ({
    type: actions.UgeneWorkflowAction,
    subType: actions.UgeneWindowWorkflow,
    command: actions.UgeneWorkflow.CREATE
});

export const closeWorkflow = (tabKey) => ({
    type: actions.UgeneWorkflowAction,
    command: actions.UgeneWorkflow.DELETE,
    tabkey: tabKey
});
