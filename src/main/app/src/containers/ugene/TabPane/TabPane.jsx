import React, {Component} from "react";
import { Tab as SemanticTab } from 'semantic-ui-react';

import "./TabPane.css";

class UgeneTabPane extends Component {

    constructor(props) {
        super(props);

        const {tabs = [{name : null}]} = props;
        const firstTab = tabs[0];

        this.state = {
            currentTab : firstTab.name
        };
    }

    onTabClick = (name) => {
        this.setState({currentTab : name});
    };

    render() {
        const {tabs, ...otherProps} = this.props;
        const {currentTab} = this.state;

        const panes = tabs.map(tab => {
            const menuItem = tab.menuItem;
            const content = tab.content;
            const borders = {borderBottom: 'none',borderRight: 'none',borderLeft: 'none'};
            return {
                menuItem: menuItem,
                render: () => <SemanticTab.Pane style={borders}>{content}</SemanticTab.Pane>
            };
        });

        return (
            <div className={'ugene-tab-pane'}>
                <SemanticTab
                    {...otherProps}
                    panes={panes}
                />
            </div>
        )
    }
}

export default UgeneTabPane;