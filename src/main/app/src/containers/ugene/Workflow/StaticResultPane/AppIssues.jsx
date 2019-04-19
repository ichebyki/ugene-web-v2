import React from 'react';
import {Route} from "react-router-dom";

import PropTypes from 'prop-types';

import ScrollPane from '../../ScrollPane';
import SplitPane from '../../SplitPane';
import {Container, Header, Icon, List, Table} from "semantic-ui-react";

class AppIssues extends React.Component {

    state = {
        issues: this.props.issues,
        selected: this.props.selected,
        onclick: this.props.onclick
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { issues } = this.props;
        if (typeof issues != 'undefined') {
            this.setState({issues: issues});
        }
        this.setState({selected: this.props.selected,
                          onclick: this.props.onclick});
    }

    onItemClick(e, d, i) {
        this.setState({selected: d.content});
        if (this.state.onclick) {
            this.state.onclick(e, d, i);
        }
    }

    render() {
        let i = 0;
        let self = this;
        this.onItemClick.bind(this);

        let tableData = this.state.issues.map(item => {
            return {severity: item.severity, line: item.line, text: item.message };
        });

        const renderBodyRow = ({ severity, line, text }, i) => {
            let iconName = 'minus';
            let iconColor = 'red';

            switch (severity) {
                case 'BLOCKER':  iconColor = 'red';    iconName = 'ban'; break;
                case 'CRITICAL': iconColor = 'red';    iconName = 'ban'; break;
                case 'MAJOR':    iconColor = 'yellow'; iconName = 'bug'; break;
                case 'MINOR':    iconColor = 'green';  iconName = 'warning sign'; break;
                case 'INFO':     iconColor = 'blue';   iconName = 'warning sign'; break;
            }
            return {
                style: {border: '0px', verticalAlign: 'bottom', cursor: 'pointer'},
                key: `issue-${i}`,
                verticalAlign: 'top',
                onClick: (e) => self.onItemClick(e, {content: i}, line),
                cells: [
                    {
                        style: {border: '0px', padding: '0.2em 0.4em 0.2em 0.2em'},
                        key: 'icon',
                        size: 'mini',
                        verticalAlign: 'top',
                        content: <Icon color={iconColor} name={iconName}/>,
                    },
                    {
                        style: {border: '0px', padding: '0.2em 0.4em 0.2em 0.2em'},
                        key: 'line',
                        verticalAlign: 'top',
                        content: line,
                    },
                    {
                        style: {border: '0px', padding: '0.2em'},
                        key: 'text',
                        verticalAlign: 'top',
                        content: <a>{text}</a>,
                    },
                ],
            }
        };

        return (
            <Container style={{padding: '1em'}}>
                <Header>
                    Issues:
                </Header>
                <Table striped
                       selectable
                       style={{border: '0'}}
                       verticalAlign={'top'}
                       renderBodyRow={renderBodyRow}
                       tableData={tableData} />
            </Container>
        );
    }
}

export default AppIssues;