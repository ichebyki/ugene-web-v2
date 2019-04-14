import React, {Component} from 'react';
import {
    Button,
    Form,
    Input,
    List,
    Message,
    Modal,
    Grid,
    Header,
    Checkbox, Portal, Segment, TransitionablePortal
} from 'semantic-ui-react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {login, logout} from '../../../data/modules/auth';
import * as Names from "../../../constants/Names";
import axios from "axios/index";



class ModalAppsAdd extends Component {

    static propTypes = {
        open: PropTypes.bool.isRequired,
        dimmer: PropTypes.string.isRequired,
        onclose: PropTypes.func,
        closeIcon: PropTypes.any.isRequired,
    };

    state = {
        open: this.props.open,
        dimmer: this.props.dimmer !== 'inverted' && this.props.dimmer !== 'blurring' ? true : this.props.dimmer,
            //dimmer: true
            //dimmer: 'inverted'
            //dimmer: 'blurring'
        authFailed: false,
        username: '',
        password: '',
        appsAddSettings: {
            name: "",
            standalone: false,
            sourcePath: "",
            classPathList: [""],
            testPathList: [""],
            monitoringPort: 0,
            httpMonitoringPort: 0,
        },
        classPathList: "",
        testPathList: "",
        openAlert: false,
    };

    openAlert = (m) => this.setState({ openAlert: true, alertMessage: m });
    closeAlert = () => this.setState({ openAlert: false, alertMessage: null });

    constructor(props) {
        super(props);

        const { app } = this.props;
        if (app) {
            this.state.appsAddSettings = app;
        }
        this.handleAddApp = this.handleAddApp.bind(this);
    }

    authFailedMessage() {
        if (!this.props.authState.authFailure) {
            return null;
        }

        return (
            <div>
                <Message negative compact>
                    <div>Please Enter a valid username and password</div>
                </Message>
                <br />
            </div>
        );
    }

    authSucceededMessage() {
        if (this.props.authState.signedIn) {
            const assignedRoles = this.props.authState.roles.map(item => {
                return <List.Item key={item}>{item}</List.Item>
            });

            return (
                <List horizontal>
                    <List.Item><List.Header>Username:</List.Header></List.Item>
                    <List.Item key={'username'}>{this.props.authState.username}</List.Item>
                    <List.Item><List.Header>Assigned Roles:</List.Header></List.Item>
                    {assignedRoles}
                </List>
            )
        }

        return null;
    }

    authCurrentMessage() {
        const { authState } = this.props;

        if (authState.authFailure) {
            return this.authFailedMessage();
        } else if (authState.signedIn) {
            return this.authSucceededMessage();
        } else {
            const assignedRoles = authState.roles.map(item => {
                return <List.Item key={"'" + item + "'"}>{item}</List.Item>
            });

            return (
                <div>
                    <List horizontal>
                        <List.Header>Assigned Roles</List.Header>
                        {assignedRoles}
                    </List>
                    <br />
                </div>
            )
        }

    }

    handleClose = (e) => {
        e.preventDefault();
        this.closeModal();
    };

    closeModal = () => {
        this.setState({ open: false })
        if (this.props.onclose) {
            this.props.onclose(this.state.appsAddSettings);
        }
        if (this.props.appState.ugeneCommandState
            && this.props.appState.ugeneCommandState.actionsEx
            && this.props.appState.ugeneCommandState.actionsEx.onClose)
        {
            this.props.appState.ugeneCommandState.actionsEx.onClose();
        }
    };

    handleAddApp(e) {
        e.preventDefault();

        const { appsAddSettings } = this.state;
        if (this.props.authState.signedIn
                && appsAddSettings) {
            if ( !(appsAddSettings.name && appsAddSettings.name.length > 0) ) {
                let message = `Failed to add application: the 'name' is null`;
                console.error(message);
                this.openAlert(message);
                return;
            }

            let headerToken = `Bearer ${localStorage.getItem(Names.JWT_TOKEN)}`;
            let self = this;

            appsAddSettings['username'] = this.props.authState.username;
            appsAddSettings['creationDateTime'] = new Date().valueOf();
            appsAddSettings['id'] = null;

            axios.post('/auth/apps/put',
                appsAddSettings,
                {headers: {authorization: headerToken}})
                .then(
                    success => {
                        let settings = success.data;
                        self.setState({appsAddSettings: settings});
                        self.closeModal();
                    },
                    failure => {
                        let message = `Failed to add new application values: ${failure}`;
                        console.error(message);
                        self.openAlert(message);
                    }
                );
        }
    };

    handleChange(e, o, key) {
        if (key === 'username' || key === 'id') {
            e.preventDefault();
            return;
        }

        let { appsAddSettings } = this.state;

        if (typeof o.checked !== 'undefined') {
            appsAddSettings[key] = o.checked;
            this.setState( {appsAddSettings: appsAddSettings} );
        }
        else if (typeof o.value !== 'undefined') {
            if (key.toString().toLowerCase().indexOf('port') > 0) {
                appsAddSettings[key] = parseInt(o.value.toString());
                if (isNaN(appsAddSettings[key])) {
                    appsAddSettings[key] = 0;
                }
            }
            else {
                appsAddSettings[key] = o.value;
            }
            e.preventDefault();
            this.setState( {appsAddSettings: appsAddSettings} );
        }
    }

    handleAddItemList(e, o, key) {
        let { appsAddSettings } = this.state;

        let value = this.state[key];
        if (appsAddSettings && appsAddSettings[key]) {
            appsAddSettings[key].push(value);
            e.preventDefault();
            this.setState( {appsAddSettings: appsAddSettings} );
            this.setState( {[key]: ""} );
        }
    }

    handleDeleteItemList(e, o, key) {
        let { appsAddSettings } = this.state;

        if (appsAddSettings && appsAddSettings[key]) {
            appsAddSettings[key].splice(o.itemlistindex - 1, 1);
            e.preventDefault();
            this.setState( {appsAddSettings: appsAddSettings} );
        }
    }

    handleChangeItemList(e, o, key) {
        let { appsAddSettings } = this.state;

        if (o.itemlistindex && o.itemlistindex > 0) {
            if (appsAddSettings && appsAddSettings[key]) {
                appsAddSettings[key][o.itemlistindex - 1] = o.value;
                e.preventDefault();
                this.setState( {appsAddSettings: appsAddSettings} );
            }
        }
        else if (o.itemlistindex && o.itemlistindex == -1) {
            e.preventDefault();
            this.setState( {[key]: o.value} );
        }
    }

    getAppFields(p) {
        if (p) {
            let s = p;
            let state = this.state;
            this.handleChange.bind(this);
            this.handleChangeItemList.bind(this);
            this.handleDeleteItemList.bind(this);
            this.handleAddItemList.bind(this);

            let rows =  Object.keys(s).map(function(key) {
                let value = s[key];

                if (value instanceof Array
                    || Object.prototype.toString.call(value) === '[object Array]'
                    || Array.isArray(value)) {
                    let i = 0;

                    rows = value.map(item => {
                        i = i + 1;
                        return <Grid.Row key={key + "-row-" + i} style={{padding: "0.3rem"}}>
                            <Grid.Column width={4} textAlign='right'>
                                {i === 1 ? key : ""}
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Input name={key + "-input-" + i}
                                       id={key + "-input-" + i}
                                       placeholder={key}
                                       value={item}
                                       ref={key + "-input-" + i}
                                       itemlistindex={i}
                                       onChange={(e, o) => this.handleChangeItemList(e, o, key)}/>
                            </Grid.Column>
                            <Grid.Column width={1}>
                                <Button icon="ban" size='mini' circular
                                        key={key + "-button-" + i}
                                        itemlistindex={i}
                                        onClick={(e, o) => this.handleDeleteItemList(e, o, key)}/>
                            </Grid.Column>
                        </Grid.Row>;
                    }, this);

                    return [rows, <Grid.Row key={key + "-row"} style={{padding: "0.3rem"}}>
                        <Grid.Column width={4} textAlign='right'>
                            {i == 0 ? key : ""}
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Input name={key + "-input"}
                                   id={key + "-input"}
                                   placeholder={key}
                                   value={"" + state[key]}
                                   ref={key + "-input"}
                                   itemlistindex={-1}
                                   onChange={(e, o) => this.handleChangeItemList(e, o, key)}/>
                        </Grid.Column>
                        <Grid.Column width={1}>
                            <Button icon='plus' size='mini' circular
                                    key={key + "-button"}
                                    itemlistindex={-1}
                                    onClick={(e, o) => this.handleAddItemList(e, o, key)}/>
                        </Grid.Column>
                    </Grid.Row>];
                }
                else if (key === "standalone") {
                    return <Grid.Row key={key + "-row"} style={{padding: "0.3rem"}}>
                        <Grid.Column width={4} textAlign='right'>
                            {key}
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Checkbox name={key + "-checkbox"}
                                   id={key + "-checkbox"}
                                   checked={value}
                                   ref={key + "-checkbox"}
                                   onChange={(e, o) => this.handleChange(e, o, key)}/>
                        </Grid.Column>
                        <Grid.Column width={1}>
                        </Grid.Column>
                    </Grid.Row>;
                }
                else {
                    return <Grid.Row key={key + "-row"} style={{padding: "0.3rem"}}>
                        <Grid.Column width={4} textAlign='right'>
                            {key}
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Input name={key + "-input"}
                                   id={key + "-input"}
                                   placeholder={key}
                                   value={"" + value}
                                   ref={key + "-input"}
                                   onChange={(e, o) => this.handleChange(e, o, key)}/>
                        </Grid.Column>
                        <Grid.Column width={1}>
                        </Grid.Column>
                    </Grid.Row>;
                }
            }, this);

            return <Grid verticalAlign='middle' >
                {rows}
            </Grid>;
        }
    };

    render() {
        const { appsAddSettings } = this.state;
        const { authState } = this.props;
        const { open, dimmer } = this.state;

        return (
            <Modal size={'small'}
                   dimmer={dimmer}
                   closeIcon={this.props.closeIcon}
                   open={open}
                   closeOnDimmerClick={false}
                   closeOnDocumentClick={false}
                   onClose={this.closeModal.bind(this)}
            >
                <Modal.Header>
                    <Header>
                        Application settings
                        <Header.Subheader>{this.authCurrentMessage()}</Header.Subheader>
                    </Header>
                </Modal.Header>

                <Modal.Content >
                    <Form onSubmit={this.handleAddApp} size={'mini'}>
                        <Form.Field>
                            {this.getAppFields(appsAddSettings)}
                        </Form.Field>
                        <Button positive disabled={!authState.signedIn} onClick={e => this.handleAddApp(e)}>Add</Button>
                        <Button negative disabled={false} onClick={e => this.handleClose(e)}>Close</Button>
                    </Form>
                </Modal.Content>

                {this.getAlert()}
            </Modal>
        )
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
}

const mapStateToProps = state => ({
    appState: state,
    authState: state.auth
});

export default connect(
    mapStateToProps,
    { login, logout }
) (ModalAppsAdd);
