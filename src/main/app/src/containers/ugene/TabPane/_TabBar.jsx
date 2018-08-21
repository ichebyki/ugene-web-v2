import React from "react";
import {Menu} from "semantic-ui-react";

import _Tab from "./Tab";

const _TabBar = (props) => {
    const {tabs, currentTab, onTabClick, ...otherProps} = props;

    const tabItems = tabs.map(tabInfo => {
        const {name, label} = tabInfo;

        return (
            <_Tab
                key={name}
                name={name}
                label={label}
                active={currentTab === name}
                onClick={onTabClick}
            />
        );
    });

    const tabPanels = tabs.map(tabInfo => {
        // const {name, component : TabComponent} = tabInfo;
        const name = tabInfo.name;
        const TabComponent = tabInfo.component;

        return (
            <ToggleDisplay show={name === currentTab} key={name}>
                {TabComponent ? (
                    <TabComponent />
                ) : (
                    <div />
                )}
            </ToggleDisplay>
        )
    });

    return (
        <div>
            <Menu tabular attached="top" {...otherProps}>
                {tabItems}
            </Menu>

            {tabPanels}
        </div>
    )
}

export default _TabBar;