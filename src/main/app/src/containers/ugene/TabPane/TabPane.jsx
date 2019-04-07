import React, {Component} from "react";
import PropTypes from 'prop-types';
import { Tab as SemanticTab, Menu, Icon, Label } from 'semantic-ui-react';

import * as UgeneComponent from "../UgeneComponent"
import "./TabPane.css";

class UgeneTabPane extends Component {

    static propTypes = {
        renderActiveOnly: PropTypes.bool.isRequired,
        tabs: PropTypes.array.isRequired,
        actions: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        const {tabs = [{name : "tab name"}]} = props;
        const firstTab = tabs[0];

        this.state = {
            currentTab : firstTab.name
        };
    }

    render() {
        const {renderActiveOnly, tabs = [{menuitem : "New tab", content: "", type: ""}]} = this.props;
        const onClickX = (e, k, t) => {
            e.preventDefault();
            if (t === "WORKFLOW") {
                this.props.actions.closeWorkflow(k, t);
            }
            else {
                this.props.actions.closeTab(k, t);
            }
        };

        const panes = tabs.map(tab => {
            const menuItem = tab.menuItem;
            const tabtype = tab.type;
            const content = UgeneComponent.ParseContent(tab);
            const borders = {borderBottom: 'none', borderRight: 'none', borderLeft: 'none'};
            const xStyle = {backgroundColor: 'transparent', color: 'red', border: 'none', paddingLeft: 0};

            if (tabtype === 'STARTPAGE') {
                return {
                    menuItem: (
                        <Menu.Item key={menuItem.key} className={'ugene-tab-menu-item'}>
                            <Icon name={menuItem.icon}/>
                            {menuItem.content}
                            <Label style={xStyle}
                                   basic
                            >
                                <sup> </sup>
                            </Label>
                        </Menu.Item>
                    ),
                    render: () =>
                        <SemanticTab.Pane className={'ugene-tab-tab-pane'} style={borders}>
                            {content}
                        </SemanticTab.Pane>
                };
            }
            else {
                return {
                    menuItem: (
                        <Menu.Item key={menuItem.key} className={'ugene-tab-menu-item'}>
                            <Icon name={menuItem.icon}/>
                            {menuItem.content}
                            <Label style={xStyle}
                                   basic
                                   onClick={(e) => onClickX.bind(this)(e, menuItem.key, tabtype)}
                            >
                                <sup>X</sup>
                            </Label>
                        </Menu.Item>
                    ),
                    render: () =>
                        <SemanticTab.Pane className={'ugene-tab-tab-pane'} style={borders}>
                            {content}
                        </SemanticTab.Pane>
                };
            }
        });

        return (
            <div className={'ugene-tab-pane'}>
                <SemanticTab
                    className={'ugene-tab-pane-tab'}
                    menu={{ /*pointing: true, */className: "ugene-tab-menu-wrapped" }}
                    renderActiveOnly={renderActiveOnly}
                    panes={panes}
                />
            </div>
        )
    }
}

export default UgeneTabPane;