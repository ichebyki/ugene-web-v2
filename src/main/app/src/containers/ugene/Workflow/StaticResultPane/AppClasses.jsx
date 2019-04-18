import React from 'react';
import {Route} from "react-router-dom";

import PropTypes from 'prop-types';

import ScrollPane from '../../ScrollPane';
import SplitPane from '../../SplitPane';
import {Container, Header, List} from "semantic-ui-react";

class AppClasses extends React.Component {

    state = {
        classes: this.props.classes,
        selected: this.props.selected,
        onclick: this.props.onclick
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { classes } = this.props;
        if (typeof classes != 'undefined') {
            this.setState({classes: classes});
        }
        this.setState({selected: this.props.selected,
                          onclick: this.props.onclick});
    }

    onItemClick(e, d) {
        if (this.state.onclick) {
            this.state.onclick(e, d);
            this.setState({selected: d.content})
        }
    }

    render() {
        let i = 0;
        let classes = this.state.classes.map(item => {
            ++i;
            if (item === this.state.selected) {
                return {key: "klas-" + i, content: item, icon: 'arrow right', as: 'a'};
            }
            return {key: "klas-" + i, content: item, icon: '', as: 'a'};
        });

        return (
            <Container style={{padding: '1em'}}>
                <Header>
                    Classes:
                </Header>
                <List style={{paddingLeft: '1em'}}
                      items={classes}
                      onItemClick={this.onItemClick.bind(this)} />
            </Container>
        );
    }
}

export default AppClasses;