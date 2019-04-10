import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {Button, Container, Form, Input, Label, List, Message, Modal, Grid} from 'semantic-ui-react';
import {authenticated, authenticationFailure, login, logout} from '../../../data/modules/auth';
import * as Names from "../../../constants/Names";
import axios from "axios/index";
import jwt_decode from "jwt-decode";



class ModalAppsAdd extends Component {

    static propTypes = {
        open: PropTypes.bool.isRequired,
        dimmer: PropTypes.string.isRequired,
        onclose: PropTypes.func,
        closeIcon: PropTypes.any.isRequired
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
        }
    };

    constructor(props) {
        super(props);
        this.handleAddApp = this.handleAddApp.bind(this);
    }

    componentDidMount() {
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
                <div>
                    <Message positive compact>
                        <List horizontal>
                            <Label key={"Assigned Roles"}>Assigned Roles</Label>
                            {assignedRoles}
                        </List>
                    </Message>
                    <br />
                </div>
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

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value });
    };

    handleClose = (e) => {
        e.preventDefault();
        this.closeModal();
    };

    closeModal = () => {
        this.setState({ open: false })
        if (this.props.onclose) {
            this.props.onclose();
        }
    };

    handleAddApp(e) {
        e.preventDefault();

        const formData = {};
        for (const field in this.refs) {
            formData[field] = this.refs[field].props.value;
        }

        if (formData) {
            const {userProfile} = this.state;

            let headerToken = `Bearer ${localStorage.getItem(Names.JWT_TOKEN)}`;
            axios.post('/auth/profile/put',
                formData,
                {headers: {authorization: headerToken}})
                .then(
                    success => {
                        let authorization = success.data.token;
                        localStorage.setItem(Names.JWT_TOKEN, authorization);

                        let token = jwt_decode(authorization);
                        authenticated({
                            signedIn: true,
                            username: token.username,
                            roles: token.roles,
                            authFailure: false
                        });

                        //Trigger a call to a private route and the authorization token should get cached
                        // $FlowFixMe Flow complaining about the localstorage being null
                        let headerToken = `Bearer ${localStorage.getItem(Names.JWT_TOKEN)}`;
                        axios.get(`/api/validate/${token.sub}`, {
                            headers: {authorization: headerToken}
                        });
                    },
                    failure => {
                        console.error(`Failed to put new profile values: ${failure}`)
                    }
                );
        }
    };

    getAppFields(p) {
        if (p) {
            let s = p;
            let handleChange = this.handleChange;
            let state = this.state;

            let rows =  Object.keys(s).map(function(key) {
                let value = s[key];

                if (value instanceof Array
                    || Object.prototype.toString.call(value) === '[object Array]'
                    || Array.isArray(value)) {
                    rows = value.map(item => {
                        return <Grid.Row key={key + "-row"}>
                            <Grid.Column width={4}>
                                {key}
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Input type={key + "-input"}
                                       name={key + "-input"}
                                       id={key + "-input"}
                                       placeholder={key}
                                       value={item}
                                       ref={key + "-input"}
                                       onChange={handleChange}/>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Button key={key + "-button"}>Delete</Button>
                            </Grid.Column>
                        </Grid.Row>;
                    });

                    return <Grid.Row key={key + "-row"}>
                        <Grid.Column width={4}>
                            {key}
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Input type={key + "-input"}
                                   name={key + "-input"}
                                   id={key + "-input"}
                                   placeholder={key}
                                   value={""}
                                   ref={key + "-input"}
                                   onChange={handleChange}/>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Button key={key + "-button"}>Add</Button>
                        </Grid.Column>
                    </Grid.Row>;
                }
                else {
                    return <Grid.Row key={key + "-row"}>
                        <Grid.Column width={4}>
                            {key}
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Input type={key + "-input"}
                                   name={key + "-input"}
                                   id={key + "-input"}
                                   placeholder={key}
                                   value={value}
                                   ref={key + "-input"}
                                   onChange={handleChange}/>
                        </Grid.Column>
                        <Grid.Column width={4}>
                        </Grid.Column>
                    </Grid.Row>;
                }
            });

            return <Grid>{rows}</Grid>;
        }
    };

    render() {
        const { appsAddSettings } = this.state;
        const { authState } = this.props;
        const { open, dimmer } = this.state;

        return (
            <Modal size="large"
                   dimmer={dimmer}
                   closeIcon={this.props.closeIcon}
                   open={open}
                   closeOnDimmerClick={false}
                   closeOnDocumentClick={false}
                   onClose={this.closeModal.bind(this)}
            >
                <Modal.Header>Application settings</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.handleAddApp}>
                        <Container>
                            {this.authCurrentMessage()}
                        </Container>
                        <Form.Field>
                            {this.getAppFields(appsAddSettings)}
                        </Form.Field>
                        <Button positive disabled={!authState.signedIn} onClick={e => this.handleAddApp(e)}>Add</Button>
                        <Button negative disabled={false} onClick={e => this.handleClose(e)}>Close</Button>
                    </Form>
                </Modal.Content>
            </Modal>
        )
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
