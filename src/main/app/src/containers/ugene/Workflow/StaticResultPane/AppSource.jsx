import React from 'react';
import {Route} from "react-router-dom";

import PropTypes from 'prop-types';

import ScrollPane from '../../ScrollPane';
import SplitPane from '../../SplitPane';
import {Container, List} from "semantic-ui-react";

class AppClasses extends React.Component {
    state = {
        appClass: this.props.appClass,
        appSource: this.props.appSource,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let { appSource } = this.props;
        if (typeof appSource != 'undefined') {
            this.setState({appSource: appSource});
        }
    }

    render() {
        let appSource = this.props.appSource;
        if (typeof appSource == 'undefined' || appSource.length === 0) {
            return <Container/>;
        }
        else if (typeof appSource === "string") {
            appSource = appSource.split("\n");
            let i = 0;
            appSource = appSource.map(item => {
                ++i;
                return {key: "file-" + i, content: <code style={{whiteSpace: 'pre'}} font="monospaced">{item}</code> };
            });
        }
        else if (Array.isArray(appSource)) {
            let i = 0;
            appSource = this.props.appSource.map(item => {
                ++i;
                return {key: "file-" + i, content: <pre font="monospaced">{item}</pre> };
            });
        }

        return (
            <Container fluid
                       font={'monospaced'}
                       style={{padding: '1em'}}>
                <List  items={appSource} />
            </Container>
        );
    }
}

export default AppClasses;