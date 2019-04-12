import React from 'react';
import {Button, Container, Header, Icon, Card, Segment, Portal} from 'semantic-ui-react';
import ScrollPane from "../ScrollPane";
import AppCard from "./AppCard";
import * as Names from "../../../constants/Names";
import {connect} from "react-redux";
import {login, logout} from "../../../data/modules/auth";
import axios from "axios/index";
import ModalAppsEdit from "./ModalAppsEdit";
import ModalAppsAdd from "./ModalAppsAdd";

const card_style = {minWidth: "32em"};

class AppsList extends React.Component {

    state = {
        authFailed: false,
        username: '',
        appsList: [],
        openAlert: false,
        openEditor: false,
        appEdit: null,
        openAdder: false,
        appAdd: null,
    };

    openAlert = (m) => this.setState({ openAlert: true, alertMessage: m });
    closeAlert = () => this.setState({ openAlert: false, alertMessage: null });

    openEditor = (app) => this.setState({ openEditor: true, appEdit: app });
    closeEditor = () => this.setState({ openEditor: false, appEdit: null });

    openAdder = () => this.setState({ openAdder: true, appAdd: null });
    closeAdder = (app) => {
        this.getAllAppList();
        this.setState({ openAdder: false, appAdd: null });
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getAllAppList();
    }

    getAllAppList() {
        let headerToken = `Bearer ${localStorage.getItem(Names.JWT_TOKEN)}`;
        let self = this;

        axios.get('/auth/apps/getall', {headers: {authorization: headerToken}})
             .then(
                 success => {
                     let apps = success.data;
                     self.setState({appsList: apps});
                 },
                 failure => {
                     console.error(`Failed to get all apps list: ${failure}`)
                 }
             );
    }

    getAllAppCards() {
        let apps = this.state.appsList;
        let i = 0;

        let cards = apps.map(app => {
            i = i + 1;
            return <AppCard key={'app-card-' + i}
                            style={card_style}
                            actions={this.props.actions}
                            app={app}
                            deleteapp={this.deleteApp.bind(this)}
                            editapp={this.editApp.bind(this)}/>
        }, this);

        return cards;
    }

    deleteApp(app) {
        let headerToken = `Bearer ${localStorage.getItem(Names.JWT_TOKEN)}`;
        let self = this;
        let message = '';

        axios.post('/auth/apps/delete',
            app,
            { headers: {authorization: headerToken} })
            .then(
                success => {
                    if (success.status == 200) {
                        message = `Application was deleted: ${success.statusText}`;
                    }
                    else {
                        message = `Failed to delete application: ${success.statusText}`;
                        console.error(message);
                        self.openAlert(message);
                    }
                    self.getAllAppList();
                },
                failure => {
                    message = `Failed to delete application: ${failure}`;
                    console.error(message);
                    this.openAlert(message);
                }
            );
    }

    editApp(app) {
        this.openEditor(app);
    }

    render() {
        return (
            <ScrollPane>
                <Container fluid style={{padding: "1em 3em 1em 3em"}}>
                    <br/>
                    <Header textAlign={'center'} as='h2'>Header</Header>
                    <Card.Group centered stackable itemsPerRow={3}>
                        {this.getAllAppCards()}
                    </Card.Group>
                    <Container textAlign={'center'}>
                        <br/>
                        <Button key={'app-add-button'}
                                icon
                                labelPosition='left'
                                primary size='small'
                                onClick={this.openAdder.bind(this)}>
                            <Icon name='tasks'/> Add Application
                        </Button>
                    </Container>
                </Container>

                {this.getAlert()}
                {this.getModalAdder()}
                {this.getModalEditor()}
            </ScrollPane>
        );
    }

    getAlert() {
        if (this.state.openAlert) {
            return <Portal open={true}
                    onOpen={this.openAlert}
                    onClose={this.closeAlert}>
                <Segment inverted color='red' style={{left: '40%', position: 'fixed', top: '20%', zIndex: 10000}}>
                    <Header>Message</Header>
                    <p>{this.state.alertMessage}</p>
                </Segment>
            </Portal>
        }
    }

    getModalAdder() {
        if (this.state.openAdder) {
            return <ModalAppsAdd open={true}
                                 dimmer={'inverted'}
                                 onclose={this.closeAdder.bind(this)}
                                 closeIcon={'close'}
                                 app={this.state.appAdd}/>;
        }
    }

    getModalEditor() {
        if (this.state.openEditor) {
            return <ModalAppsEdit open={true}
                                  dimmer={'inverted'}
                                  onclose={this.closeEditor.bind(this)}
                                  closeIcon={'close'}
                                  app={this.state.appEdit}/>;
        }
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
