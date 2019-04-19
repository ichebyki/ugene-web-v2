import React from 'react';
import {Route} from "react-router-dom";

import PropTypes from 'prop-types';

import ScrollPane from '../../ScrollPane';
import SplitPane from '../../SplitPane';
import {Container, Header, List, Segment} from "semantic-ui-react";

class AppIssueMessage extends React.Component {

    state = {
        issue: this.props.issue,
        onclick: this.props.onclick,
        content: this.props.content,
        onDidMount: this.props.onDidMount,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.state.onDidMount) {
            this.state.onDidMount(this);
        }
    }

    onItemClick(e, d) {
        if (this.state.onclick) {
            this.state.onclick(e, d);
        }
    }

    render() {
        return (
            <Segment>
                {this.state.content}
            </Segment>
        );
    }
}

export default AppIssueMessage;