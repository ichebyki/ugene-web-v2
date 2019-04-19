import React from 'react';
import {Route} from "react-router-dom";

import PropTypes from 'prop-types';

import ScrollPane from '../../ScrollPane';
import SplitPane from '../../SplitPane';
import {Container, Header, HeaderSubheader, Icon, List, Table} from "semantic-ui-react";
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
        this.setState({selected: d.content});
        if (this.state.onclick) {
            this.state.onclick(e, d);
        }
    }

    render() {
        let i = 0;
        let packages;
        let self = this;
        this.onItemClick.bind(this);

        let tableData = this.state.packages.map(item => {
            ++i;
            if (item === this.state.selected) {
                return {key: "pack-" + i, content: item, icon: 'arrow right', as: 'a'};
            }
            return {key: "pack-" + i, content: item, icon: '', as: 'a'};
        });

        const renderBodyRow = ({ key, content, icon, as }, i) => {
            return {
                style: {border: '0px', verticalAlign: 'bottom', cursor: 'pointer'},
                key: `klass-${i}`,
                verticalAlign: 'top',
                onClick: (e) => self.onItemClick(e, {content: content}),
                cells: [
                    {
                        style: {border: '0px', padding: '0.2em', textAlign: 'right'},
                        key: 'icon',
                        size: 'mini',
                        verticalAlign: 'top',
                        content: <Icon color={'black'} name={icon}/>,
                    },
                    {
                        style: {border: '0px', padding: '0.2em'},
                        key: 'text',
                        verticalAlign: 'top',
                        content: <a>{content}</a>,
                    },
                ],
            }
        };

        return (
            <Container style={{padding: '1em'}}>
                <Header>
                    Packages:
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

export default AppPackages;