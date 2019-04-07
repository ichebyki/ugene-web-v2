import React from "react";

import UgeneWorkflow from "./Workflow"
import AppsList from "./AppsList";

export const ParseContent = (o) => {
    let content = '';
    if (o && o.type) {
        if (o.type === 'STARTPAGE') {
            content = o.content.content;
        }
        else if (o.type === 'WORKFLOW') {
            content = o.content.content;
        }
    }
    if (content && typeof content === "string") {
        try {
            const obj = JSON.parse(content);
            if (obj && obj.type) {
                switch (obj.type) {
                    case "UgeneStartPage":
                        return <AppsList {...obj.props} />
                    case "UgeneWorkflow":
                        return <UgeneWorkflow {...obj.props} />
                }
            }
        }
        catch (e) {
            return <div >{content}</div>
        }
    }
    return <div >{content ? content.toString() : ""}</div>
};