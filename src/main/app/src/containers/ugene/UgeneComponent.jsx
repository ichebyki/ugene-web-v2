import React from "react";

import UgeneWorkflow from "./Workflow"

export const ParseContent = (content) => {
    if (content && typeof content === "string") {
        try {
            const obj = JSON.parse(content);
            if (obj && obj.type) {
                switch (obj.type) {
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