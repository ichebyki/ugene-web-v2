import React from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
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

    openEditor = (app) => { this.setState({ openEditor: true, appEdit: app, }); };
    closeEditor = () => {
        this.getAllAppList();
        this.setState({ openEditor: false, appEdit: null, });
    };

    openAdder = () => this.setState({ openAdder: true, appAdd: null });
    closeAdder = (app) => {
        this.getAllAppList();
        this.setState({ openAdder: false, appAdd: null });
    };

    constructor(props) {
        super(props);
    }

    refreshShoeList() {
        this.setState({refreshShoeList: !this.state.refreshShoeList})
    };

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
                     self.refreshShoeList();
                 },
                 failure => {
                     console.error(`Failed to get all apps list: ${failure}`)
                 }
             );
    }

    getAllAppCards(refresh) {
        let apps = this.state.appsList;

        return apps.map(app => {
            return <AppCard key={'app-card-' + app.id}
                            style={card_style}
                            actions={this.props.actions}
                            app={app}
                            deleteapp={this.deleteApp.bind(this)}
                            editapp={this.editApp.bind(this)}
                            onRunStaticClick={this.onRunStaticClick.bind(this)}
                            onGetStaticReport={this.onGetStaticReport.bind(this)}
                            refresh={refresh}/>
        }, this);
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

    editApp(app, card) {
        this.openEditor(app, card);
    }

    onRunStaticClick(e, d, app, accordion) {
        let headerToken = `Bearer ${localStorage.getItem(Names.JWT_TOKEN)}`;
        let self = this;
        let message = '';

        axios.post('/auth/apps/static/report/runsonar',
                   app,
                   { headers: {authorization: headerToken} })
             .then(function (success) {
                 if (success.status === 200) {
                     message = `Started static analyzer: ${success.statusText}`;
                     self.chekTaskCompleted(app);
                 }
                 else {
                     message = "Failed to start static analyzer \n"
                               + "status code " + success.status + " \n"
                               + "status text '" + success.statusText + "'";
                     self.openAlert(message);
                 }
             })
             .catch(function (failure) {
                 message = "Failed to start static analyzer \n"
                           + "status code " + failure.response.status + " \n"
                           + "status text '" + failure.response.statusText + "'\n"
                           + failure.response.data["message"];
                 self.openAlert(message);
             })
             .then(function () {
                 // always executed
                 console.error(message);
                 self.getAllAppList();
             });
        setTimeout( () => self.getAllAppList(), 1000);
    };

    chekTaskCompleted(app) {
        let headerToken = `Bearer ${localStorage.getItem(Names.JWT_TOKEN)}`;
        let self = this;

        setTimeout(function tick() {
            let message = '';
            let checkAgain = true;

            axios.post('/auth/apps/static/report/checktask',
                       app,
                       { headers: {authorization: headerToken} })
                 .then(function (success) {
                     if (success.status === 200) {
                         message = `Completed static analyzer: ${success.statusText}`;
                         checkAgain = false;
                     }
                     else {
                         message = success.statusText;
                     }
                 })
                 .catch(function (failure) {
                     self.openAlert(message = failure.response.statusText);
                 })
                 .then(function () {
                     // always executed
                     console.error(message);

                     if (checkAgain) {
                         setTimeout(tick, 5000);
                     }
                     else {
                         setTimeout( () => self.getAllAppList(), 2000);
                     }
                 });
        }, 5000);
    }

    onGetStaticReport(e, d, app, accordion) {
        let headerToken = `Bearer ${localStorage.getItem(Names.JWT_TOKEN)}`;
        let self = this;
        let message = '';

        axios.post('/auth/apps/static/report/fetch',
                   app,
                   { headers: {authorization: headerToken} })
             .then(function (success) {
                 if (success.status === 200) {
                     message = `Started fetching static report: ${success.statusText}`;
                 }
                 else {
                     message = "Failed to fetch static report \n"
                               + "status code " + success.status + " \n"
                               + "status text '" + success.statusText + "'";
                     self.openAlert(message);
                 }
             })
             .catch(function (failure) {
                 message = "Failed to fetch static report \n"
                           + "status code " + failure.response.status + " \n"
                           + "status text '" + failure.response.statusText + "'\n"
                           + failure.response.data["message"];
                 self.openAlert(message);
             })
             .then(function () {
                 // always executed
                 console.error(message);
                 self.getAllAppList();
             });
        setTimeout( () => self.getAllAppList(), 1000);
    };

    render() {
        const refreshShoeList = this.state.refreshShoeList;
        return (
            <ScrollPane>
                <Container fluid
                           style={{padding: "1em 3em 1em 3em"}}>
                    <Header textAlign={'center'} as='h2'>Application list</Header>

                    <Card.Group centered stackable itemsPerRow={3}>
                        {this.getAllAppCards(refreshShoeList)}
                    </Card.Group>

                    <Container textAlign={'center'}>
                        <Button style={{position: 'fixed', bottom: '10px', right: '10px'}}
                                key={'app-add-button'}
                                circular
                                icon={'plus'}
                                color='green'
                                size='huge'
                                onClick={this.openAdder.bind(this)}/>
                    </Container>

                    {this.getAlert()}
                    {this.getModalAdder()}
                    {this.getModalEditor()}
                </Container>
            </ScrollPane>
        );
    }

    getAlert() {
        if (this.state.openAlert) {
            let i = 0;
            return <Portal open={true}
                    onOpen={this.openAlert}
                    onClose={this.closeAlert}>
                <Segment padded
                         inverted
                         color='red'
                         style={{width: '50%', left: '25%', right: '25%', position: 'fixed', top: '20%', zIndex: 10000}}>
                    <Header>Message</Header>
                    <Container style={{paddingLeft: '2em'}}>{
                        this.state.alertMessage.split("\n").map(function(item) {
                            i = i + 1;
                            return <div key={"alertMessage-" + i}>
                                {item}
                            </div>;
                        })
                    }</Container>
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
