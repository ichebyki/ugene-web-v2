import React from 'react';
import {Button, Container, Header, Icon, Grid} from 'semantic-ui-react';
import ScrollPane from "../ScrollPane";
import AppCard from "./AppCard";
import * as Names from "../../../constants/Names";
import {connect} from "react-redux";
import {login, logout} from "../../../data/modules/auth";
import axios from "axios/index";

const card_style = {minWidth: "32em"};

class AppsList extends React.Component {

    state = {
        authFailed: false,
        username: '',
        appsList: [],
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getAllAppList();
    }

    getAllAppList() {
        let headerToken = `Bearer ${localStorage.getItem(Names.JWT_TOKEN)}`;

        axios.get('/auth/apps/getall', {headers: {authorization: headerToken}})
            .then(
                success => {
                    let apps = success.data;
                    this.setState({appsList: apps});
                },
                failure => {
                    console.error(`Failed to get all apps list: ${failure}`)
                }
            );
    }

    handleNewApp = (e, { name }) => {
        this.props.actions.appsadd({onClose: this.getAllAppList.bind(this)});
    };

    getAllAppCards() {
        let apps = this.state.appsList;
        let i = 0;

        let cards = apps.map(app => {
            i = i + 1;
            return <Grid.Column key={'app-' + i} style={card_style}>
                <AppCard key={'app-card-' + i} actions={this.props.actions} app={app}/>
            </Grid.Column>;
        }, this);

        cards.push(<Grid.Column key={'add-app-button'} textAlign='center' verticalAlign='middle' style={card_style}>
            <Button icon
                    labelPosition='left'
                    primary size='small'
                    onClick={this.handleNewApp.bind(this) /*нужна так как React с версии 0.14.x не привязывает this к компоненту.*/ }>
                <Icon name='tasks'/> Add Application
            </Button>
        </Grid.Column>);

        return cards;
    }

    render() {
        return (
            <ScrollPane>
                <Container style={{padding: "1em 3em 1em 3em"}}>
                    <br/>
                    <Header as='h2'>Header</Header>
                    <Grid stackable verticalAlign='top' columns={2}>
                        <Grid.Row>
                            {this.getAllAppCards()}
                        </Grid.Row>
                    </Grid>
                </Container>
            </ScrollPane>
        );
    }
}

const mapStateToProps = state => ({
    appState: state,
    authState: state.auth
});

export default connect(
    mapStateToProps,
    { login, logout }
) (AppsList);
