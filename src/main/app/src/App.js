/* @flow */
import React from 'react';
import { Route } from 'react-router-dom';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { Accordion, Tab, List, Label } from 'semantic-ui-react'

import { Container } from 'reactstrap';


import AppNav from './containers/appnav/index';
import SplitPane from './containers/ugene/splitpane';
import ScrollPane from './containers/ugene/scrollpane';
import UgeneWorkflow from './containers/ugene/workflow';

const styles = {
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -18,
        marginRight: 10,
    },
};

const paneStyle = {
    padding: 0 + 'px',
    borderColor: 'transparent',
};

const panes2 = [
    { menuItem: 'Tab 1', render: () => <Tab.Pane style={paneStyle}>Tab 1 Content</Tab.Pane> },
    { menuItem: 'Tab 2', render: () => <Tab.Pane style={paneStyle}>Tab 2 Content</Tab.Pane> },
    { menuItem: 'Tab 3', render: () =>
            <Tab.Pane style={paneStyle}>
                <UgeneWorkflow/>
            </Tab.Pane> },
];

const panes = [
    { menuItem: 'Tab 1', pane: { key: 'tab1', content: 'This is massive tab', size: 'massive' } },
    {
        menuItem: 'Tab 2',
        pane: { key: 'tab2', content: 'This tab has a center aligned text', textAlign: 'center' },
    },
    {
        menuItem: 'Tab 3',
        pane: {
            key: 'tab3',
            content: (
                <div>
                    This tab contains an <Label>JSX</Label> element
                </div>
            ),
        },
    },
    {
        menuItem: 'Tab 4',
        pane: (
            <Tab.Pane key='tab4'>
                <p>This tab has a complex content</p>

                <List>
                    <List.Item>Apples</List.Item>
                    <List.Item>Pears</List.Item>
                    <List.Item>Oranges</List.Item>
                </List>
            </Tab.Pane>
        ),
    },
];


function DenseAppBar(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <SplitPane split="horizontal" defaultSize={40} primary="first">
                <AppNav/>
                <Tab panes={panes} />
            </SplitPane>
        </div>
    );
}

DenseAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DenseAppBar);
