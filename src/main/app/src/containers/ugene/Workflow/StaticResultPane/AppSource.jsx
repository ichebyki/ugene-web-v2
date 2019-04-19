import React from 'react';
import {Route} from "react-router-dom";

import PropTypes from 'prop-types';

import ScrollPane from '../../ScrollPane';
import SplitPane from '../../SplitPane';
import {Container, List, Message, Table} from "semantic-ui-react";

class IssueMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: "" };
    }

    componentDidMount() {
        // this would fetch or connect to a store
        const { lineNumber } = this.props;
        if (this.props.onDidMountMessage) {
            this.props.onDidMountMessage(lineNumber, this);
        }
    }

    render() {
        const { lineNumber, onDidMountMessage, ...passThroughProps } = this.props;
        return (
            <Message
                {...passThroughProps}
            />
        )
    }
}

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
        let textData;
        let issuesData;
        if (typeof source == 'undefined' || source.length === 0) {
            return <Container/>;
        }
        else if (typeof source === "string") {
            source = source.split("\n");
            let i = 0;
            textData = source.map(item => {
                return {text: item };
            });
            issuesData = issues.reduce(function(map, obj) {
                map[obj.line] = <div>Line: {obj.line}<div>{obj.message}</div></div>;
                return map;
            }, {});
        }

        const renderBodyRow = ({ text }, i) => ({
            style: {border: '0px', verticalAlign: 'bottom'},
            key: `line-${i}`,
            cells: [
                {
                    style: {border: '0px', padding: '0.1em 0.4em 0.1em 0.1em'},
                    key: 'line',
                    content: i + 1
                },
                {
                    style: {border: '0px', padding: '0.1em'},
                    key: 'text',
                    content: <div>
                        {i == 0 ? issuesData[i] ? <IssueMessage compact
                                                                color={'red'}
                                                                style={{margin: '0.8em 0 0em 0em'}}
                                                                lineNumber={i}
                                                                onDidMountMessage={this.props.onDidMountMessage}
                                                                content={issuesData[i]}/> : ''
                                : issuesData[i + 1] ? <IssueMessage compact
                                                                    color={'red'}
                                                                    style={{margin: '0.8em 0 0em 0em'}}
                                                                    lineNumber={i}
                                                                    onDidMountMessage={this.props.onDidMountMessage}
                                                                    content={issuesData[i + 1]}/> : ''}
                        <pre style={{padding: '0', margin: '0'}}>{text}</pre>
                    </div>,
                },
            ],
        });

        return (
            <Container fluid
                       font={'monospaced'}
                       style={{padding: '1em', font: 'monospaced', fontSize: '0.9em'}}>
                <Table striped
                       compact='very'
                       style={{border: '0'}}
                       renderBodyRow={renderBodyRow}
                       tableData={textData} />
            </Container>
        );
    }
}

export default AppClasses;