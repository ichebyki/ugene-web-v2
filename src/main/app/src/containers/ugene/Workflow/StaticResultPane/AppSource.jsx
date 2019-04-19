import React from 'react';
import {Route} from "react-router-dom";

import PropTypes from 'prop-types';

import ScrollPane from '../../ScrollPane';
import SplitPane from '../../SplitPane';
import {Container, List} from "semantic-ui-react";

class AppClasses extends React.Component {
    state = {
        klass: this.props.klass,
        source: this.props.source,
        issues: this.props.issues,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let { source } = this.props;
        if (typeof source != 'undefined') {
            this.setState({source: source});
        }
    }

    render() {
        let { source, issues } = this.props;
        if (typeof source == 'undefined' || source.length === 0) {
            return <Container/>;
        }
        else if (typeof source === "string") {
            source = source.split("\n");
            let i = 0;
            source = source.map(item => {
                ++i;
                if (i === 1) {
                    return {key: "file-" + i,
                        content: <code style={{whiteSpace: 'pre'}}
                                       font="monospaced">{item}</code>
                    };
                }
                return {key: "file-" + i,
                    content: <code style={{whiteSpace: 'pre'}} font="monospaced">{item}</code> };
            });
            issues.map(item => {
               console.log(item.line);
            });
        }
        else if (Array.isArray(source)) {
            let i = 0;
            source = this.props.source.map(item => {
                ++i;
                return {key: "file-" + i, content: <pre font="monospaced">{item}</pre> };
            });
        }

        return (
            <Container fluid
                       font={'monospaced'}
                       style={{padding: '1em'}}>
                <List ordered items={source} />
            </Container>
        );
    }
}

export default AppClasses;