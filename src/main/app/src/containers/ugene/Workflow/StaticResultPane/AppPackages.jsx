import React from 'react';
import {Route} from "react-router-dom";

import PropTypes from 'prop-types';

import ScrollPane from '../../ScrollPane';
import SplitPane from '../../SplitPane';
import {Container, Header, HeaderSubheader, List} from "semantic-ui-react";
import * as Names from "../../../../constants/Names";
import axios from "axios";

class AppPackages extends React.Component {

    state = {
        packages: this.props.packages,
        selected: this.props.selected,
        onclick: this.props.onclick
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let { packages } = this.props;
        if (typeof packages != 'undefined') {
            this.setState({packages: packages});
        }
        this.setState({selected: this.props.selected,
                          onclick: this.props.onclick});
    }

    onItemClick(e, d) {
        if (this.state.onclick) {
            this.state.onclick(e, d);
        }
    }

    render() {
        let i = 0;
        let packages = this.state.packages.map(item => {
            ++i;
            if (item === this.state.selected) {
                return {key: "pack-" + i, content: item, icon: 'arrow right', as: 'a'};
            }
            return {key: "pack-" + i, content: item, icon: '', as: 'a'};
        });

        return (
            <Container style={{padding: '1em'}}>
                <Header>
                    Packages:
                </Header>
                <List style={{paddingLeft: '1em'}}
                      items={packages}
                      onItemClick={this.onItemClick.bind(this)} />
            </Container>
        );
    }
}

export default AppPackages;