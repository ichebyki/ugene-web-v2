/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { Container } from 'reactstrap';

import Home from "../home";
import SignIn from "../signin";
import About from "../about";
import type, {SocketState} from "../../data/modules/websockets";
import {AuthState} from "../../data/modules/auth";

import ScrollPane from '../ugene/scrollpane';
import SplitPane from '../ugene/splitpane';

type Props = {
};

type State = {
};

class UgeneWorkflow extends React.Component<Props, State> {
    props: Props;
    state: State;

    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
    }

    render() {
        return (
            <SplitPane split="vertical" minSize={0} defaultSize={200} primary="second">
                <ScrollPane>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/signin" component={SignIn} />
                    <Route exact path="/about-us" component={About} />
                </ScrollPane>
                <ScrollPane>
                    3,2
                </ScrollPane>
            </SplitPane>
        )
    }
}

export default UgeneWorkflow;
