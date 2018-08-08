/* @flow */
import React from 'react';
import { Route } from 'react-router-dom';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { Accordion, Tab } from 'semantic-ui-react'

import { Container } from 'reactstrap';

import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';

import SplitPane from 'react-split-pane';

import AppNav from '../appnav/index';
import UgeneWorkflow from '../ugene/workflow';

const styles = {
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -18,
        marginRight: 10,
    },
};


const level1Panels = [
    { key: 'panel-1a', title: 'Level 1A', content: 'Level 1A Contents' },
    { key: 'panel-ba', title: 'Level 1B', content: 'Level 1B Contents' },
]

const Level1Content = (
    <div>
        Welcome to level 1
        <Accordion.Accordion panels={level1Panels} />
    </div>
)

const level2Panels = [
    { key: 'panel-2a', title: 'Level 2A', content: 'Level 2A Contents' },
    { key: 'panel-2b', title: 'Level 2B', content: 'Level 2B Contents' },
]

const Level2Content = (
    <div>
        Welcome to level 2
        <Accordion.Accordion panels={level2Panels} />
    </div>
)

const rootPanels = [
    { key: 'panel-1', title: 'Level 1', content: { content: Level1Content } },
    { key: 'panel-2', title: 'Level 2', content: { content: Level2Content } },
]


const paneStyle = {
    padding: 0 + 'px',
    borderColor: 'transparent',
};

const panes = [
    { menuItem: 'Tab 1', render: () => <Tab.Pane style={paneStyle}>Tab 1 Content</Tab.Pane> },
    { menuItem: 'Tab 2', render: () => <Tab.Pane style={paneStyle}>Tab 2 Content</Tab.Pane> },
    { menuItem: 'Tab 3', render: () =>
            <Tab.Pane style={paneStyle}>
                <UgeneWorkflow/>
            </Tab.Pane> },
]


function DenseAppBar(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <SplitPane split="horizontal" defaultSize={40} primary="first">
                <AppNav/>
                <SplitPane split="vertical" minSize={0} defaultSize={200} primary="first">
                    <PerfectScrollbar>
                        <Accordion defaultActiveIndex={0} panels={rootPanels} styled />
                    </PerfectScrollbar>
                    <SplitPane split="horizontal" minSize={0} defaultSize={200} primary="second">
                        <div><Tab panes={panes} /></div>
                        <PerfectScrollbar>
                            2.2
                        </PerfectScrollbar>
                    </SplitPane>
                </SplitPane>
            </SplitPane>
        </div>
    );
}

DenseAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DenseAppBar);
