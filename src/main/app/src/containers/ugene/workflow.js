/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';

import SplitPane from 'react-split-pane';
import { Container } from 'reactstrap';
import Home from "../home";
import SignIn from "../signin";
import About from "../about";
import type, {SocketState} from "../../data/modules/websockets";
import {AuthState} from "../../data/modules/auth";

type Props = {
};

type State = {
    _hei: int
};

class UgeneWorkflow extends React.Component<Props, State> {
    props: Props;
    state: State;

    constructor(props) {
        super(props);
        this.state = {
            _hei: 0
        };
    }

    componentDidUpdate() {
        let element = ReactDOM.findDOMNode(this);
        let parent = element.parentNode;
        let originalText = element.innerText;
        let containerHeight = parent.offsetHeight;
        let temp = originalText;
        let h = parent.parentNode.parentNode.parentNode.clientHeight;
        if (h !== this.state._hei) {
            this.setState({_hei: h});
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const divStyle = {
            height: (this.state._hei - 48) + 'px',
            /*padding: 0 + 'px', ZZZ*/
        };

        return (
            <SplitPane style={divStyle} split="vertical" minSize={0} defaultSize={200} primary="second">
                <PerfectScrollbar>
                    <div style={{margin: "0.3em"}}>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/signin" component={SignIn} />
                        <Route exact path="/about-us" component={About} />
                    </div>
                </PerfectScrollbar>
                <PerfectScrollbar>
                    3,2
                </PerfectScrollbar>
            </SplitPane>
        )
    }
}

export default UgeneWorkflow;
