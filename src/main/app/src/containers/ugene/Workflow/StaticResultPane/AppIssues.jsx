import React from 'react';
import {Route} from "react-router-dom";

import PropTypes from 'prop-types';

import ScrollPane from '../../ScrollPane';
import SplitPane from '../../SplitPane';
import {Container, Header, List} from "semantic-ui-react";

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

        let issues = this.state.issues.map(item => {
            let icon = '';
            if (item === this.state.selected) {
                icon = 'arrow right';
            }
            return {
                key: "" + i++,
                /*icon: icon,*/
                as: 'a',
                content: <List horizontal>
                    <List.Item>
                        {item.line + ":"}
                    </List.Item>
                    <List.Item
                        onClick={(e, d) => self.onItemClick(e, d, item.line)}>
                        {item.message}
                    </List.Item>
                </List>
            };
        });

        return (
            <Container style={{padding: '1em'}}>
                <Header>
                    Issues:
                </Header>
                <List compact
                      style={{paddingLeft: '1em'}}
                      items={issues}/>
            </Container>
        );
    }
}

export default AppIssues;