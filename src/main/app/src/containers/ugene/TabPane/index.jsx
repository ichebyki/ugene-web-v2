import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
                pane: 'default',
                content: 'This is a content of the pane "Home"'
            }],
            activeIndex,
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
                    content: tab.content
                };

                return {
                    menuItem: menuItem,
                    content: content,
                    type: tab.type
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
