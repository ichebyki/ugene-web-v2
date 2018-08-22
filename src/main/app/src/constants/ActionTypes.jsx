/*
 * action types
 */
export const _EMPTY_ = "_EMPTY_";

/* Modal actions */
export const About = "ABOUT";
export const Help = "HELP";
export const SignIn = "SIGN_IN";
export const SignUp = "SIGN_UP";
export const SignOut = "SIGN_OUT";

/* Window types */
export const UgeneWindowStartUp = "UgeneWindowStartUp";
export const UgeneWindowWorkflow = "UgeneWindowWorkflow";

/* action types */
export const UgeneProjectAction = "UgeneProjectAction";
export const UgeneWindowAction = "UgeneWindowAction";
export const UgeneWorkflowAction = "UgeneWorkflowAction";
export const UgeneWorkflowElementAction = "UgeneWorkflowElementAction";

/* actions' sub-types */

export const UgeneProject = {
    CREATE     : 'CREATE',
    DELETE     : 'DELETE',
    OPEN       : 'OPEN',
    CLOSE      : 'CLOSE',
    ACTIVATE   : 'ACTIVATE',
    SAVE       : 'SAVE',
    SELECT     : 'SELECT'
};

export const UgeneWindow = {
    CREATE     : 'CREATE',
    DELETE     : 'DELETE',
    OPEN       : 'OPEN',
    CLOSE      : 'CLOSE',
    ACTIVATE   : 'ACTIVATE',
    SAVE       : 'SAVE',
    SELECT     : 'SELECT'
};


export const UgeneWorkflow = {
    CREATE     : 'CREATE',
    DELETE     : 'DELETE',
    OPEN       : 'OPEN',
    CLOSE      : 'CLOSE',
    ACTIVATE   : 'ACTIVATE',
    SAVE       : 'SAVE',
    SELECT     : 'SELECT'
};


export const UgeneWorkflowElement = {
    CREATE     : 'CREATE',
    DELETE     : 'DELETE',
    OPEN       : 'OPEN',
    CLOSE      : 'CLOSE',
    ACTIVATE   : 'ACTIVATE',
    SAVE       : 'SAVE',
    SELECT     : 'SELECT'
};
