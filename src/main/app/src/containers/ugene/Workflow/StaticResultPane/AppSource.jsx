import React from 'react';
import {Route} from "react-router-dom";

import PropTypes from 'prop-types';

import ScrollPane from '../../ScrollPane';
import SplitPane from '../../SplitPane';
import {Container, Label, List, Message, Table} from "semantic-ui-react";

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
        const { lineNumber, onDidMountMessage, content,  ...passThroughProps } = this.props;
        let color = 'red';
        let content2 = [];
        for (let key in content) {
            let value = content[key];
            switch (key) {
                case 'BLOCKER':  color = 'red';    break;
                case 'CRITICAL': color = 'red';    break;
                case 'MAJOR':    color = 'yellow'; break;
                case 'MINOR':    color = 'green';  break;
                case 'INFO':     color = 'blue';   break;
            }
            content2.push(
                <div key={key}>
                    <Message
                        attached={'bottom'}
                        key={key}
                        color={color}
                        content={value}
                        {...passThroughProps}
                    />
                </div>
            );
        }
        return (content2);
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
        let issuesSeverity;

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
                if (!(obj.line in map)) {
                    map[obj.line] = {};
                }
                map[obj.line][obj.severity] = <div>Line: {obj.line}<div>{obj.message}</div></div> ;
                return map;
            }, {});
            issuesSeverity = issues.reduce(function(map, obj) {
                map[obj.line] = obj.severity;
                return map;
            }, {});
        }

        const renderBodyRow = ({ text }, i) => {
            let color = 'red';
            return {
                style: {border: '0px', verticalAlign: 'bottom'},
                key: `line-${i}`,
                    cells: [
                {
                    style: {border: '0px', padding: '0.1em 0.4em 0.1em 0.1em'},
                    key: 'line',
                    content: (i + 1)
                },
                {
                    style: {border: '0px', padding: '0.1em'},
                    key: 'text',
                    content: <div>
                        {
                            issuesData[i === 0 ? i : i + 1]
                            ? <IssueMessage compact
                                          style={{margin: '0.2em'}}
                                          lineNumber={i}
                                          onDidMountMessage={this.props.onDidMountMessage}
                                          content={issuesData[i === 0 ? i : i + 1]} />
                            : ''
                        }
                        <pre style={{padding: '0', margin: '0'}}>{text}</pre>
                    </div>,
                },
            ],
            }
        };

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