import React, {Component} from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Tab as SemanticTab, Menu, Icon, Label } from 'semantic-ui-react';

import "./TabPane.css";

class UgeneTabPane extends Component {

    static propTypes = {
        renderActiveOnly: PropTypes.bool.isRequired,
        tabs: PropTypes.array.isRequired,
        deleteTab: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        const {tabs = [{name : null}]} = props;
        const firstTab = tabs[0];

        this.state = {
            currentTab : firstTab.name
        };
    }

    render() {
        const {renderActiveOnly, tabs = [{menuitem : "New tab", content: ""}], ...otherProps} = this.props;
        const {currentTab} = this.state;
        const onClickX = (e, k) => {
            e.preventDefault();
            this.props.deleteTab(k);
        };

        const panes = tabs.map(tab => {
            const menuItem = tab.menuItem;
            const content = tab.content.content;
            const borders = {borderBottom: 'none', borderRight: 'none', borderLeft: 'none'};
            const menuItemStyle = {paddingLeft: '0.3em', paddingRight: '0.1em'};
            const xStyle = {backgroundColor: 'transparent', color: 'red', border: 'none', paddingLeft: 0};

            return {
                menuItem: (
                    <Menu.Item key={menuItem.key} className={'ugene-tab-menu-item'} >
                        <Icon name={menuItem.icon} />{menuItem.content}<Label style={xStyle} basic onClick={(e) => onClickX(e,menuItem.key)} ><sup>X</sup></Label>
                    </Menu.Item>
                ),
                render: () =>
                    <SemanticTab.Pane style={borders}>
                        {content}
                    </SemanticTab.Pane>
            };
        });

        return (
            <div className={'ugene-tab-pane'}>
                <SemanticTab
                    menu={{ /*pointing: true, */className: "ugene-tab-menu-wrapped" }}
                    renderActiveOnly={renderActiveOnly}
                    panes={panes}
                />
            </div>
        )
    }
}

export default UgeneTabPane;