import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as actions from '../../../constants/ActionTypes';
import TabPane from './TabPane';


export default class UgeneTabPane extends Component {

    static propTypes = {
        renderActiveOnly: PropTypes.bool.isRequired,
        tabs: PropTypes.array.isRequired
    };

    render() {
        const {
            tabs = [{
                key: 'home',
                icon: 'home',
                name: 'Home',
                type: 'HOME',
                desc: 'This is a pane "Home"',
                pane: 'default'
            }],
            ...otherProps
        } = this.props;

        if (tabs && tabs.length > 0) {
            const panes = tabs.map(tab => {
                const menuItem = {
                    key: tab.key,
                    icon: tab.icon,
                    content: tab.name
                };
                const content = {
                    key: tab.key,
                    content: tab.desc
                };

                return {
                    menuItem: menuItem,
                    content: content
                };
            });


            return (
                <TabPane renderActiveOnly={this.props.renderActiveOnly}
                         tabs={panes}
                         {...otherProps} />
            );
        }
        return null;
    }
}
