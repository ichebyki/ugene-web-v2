import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {Button, Container, Input, List, Message, Modal} from 'semantic-ui-react';
import { Form } from 'semantic-ui-react';

import { login, logout } from '../../../data/modules/auth';


class ModalSignIn extends Component {

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
        password: ''
    };

    handleSignIn(event) {
        event.preventDefault();

        const { username, password } = this.state;

        const u = username ? username.trim() : '';
        const p = password ? password.trim() : '';

        if (u.length === 0) {
            return;
        }

        this.props.login(u, p);
        this.closeModal();
    }

    handleSignOut(event) {
        event.preventDefault();

        this.props.logout();
        this.closeModal();
    }

    authFailedMessage() {
        if (!this.props.authState.authFailure) {
            return null;
        }

        return (
            <div>
                <Message negative compact>
                    <h1>Authentication failed!</h1>
                    <div>Please Enter a valid username and password</div>
                </Message>
                <br />
            </div>
        );
    }

    authSucceededMessage() {
        if (this.props.authState.signedIn) {
            const assignedRoles = this.props.authState.roles.map(item => {
                return <List.Item>{item}</List.Item>
            });

            return (
                <div>
                    <Message positive compact>
                        <h1>Authentication Succeeded!</h1>
                        <div>Signed in as: {this.props.authState.username}</div>
                        <List>
                            <List.Header>Assigned Roles</List.Header>
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
                    <Message positive compact>
                        <div>Signed in as: {authState.username}</div>
                        <List>
                            <List.Header>Assigned Roles</List.Header>
                            {assignedRoles}
                        </List>
                    </Message>
                    <br />
                </div>
            )
        }

    }

    handleLogin = (e, { name, value }) => {
        e.preventDefault();
        this.props.login("admin", "admin");
        this.closeModal();
    };

    handleRegister = (e, { name, value }) => {
        e.preventDefault();
        this.closeModal();
    };

    handleClose = (e, { name, value }) => {
        e.preventDefault();
        this.closeModal();
    };


    handleChange1 = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value });
    };

    closeModal = () => {
        this.setState({ open: false })
        if (this.props.onclose) {
            this.props.onclose();
        }
    };

    render() {

        const { username, password } = this.state;
        const { authState } = this.props;
        const { open, dimmer } = this.state;

        return (
            <Modal size="tiny"
                   dimmer={dimmer}
                   closeIcon={this.props.closeIcon}
                   open={open}
                   closeOnDimmerClick={false}
                   closeOnDocumentClick={false}
                   onClose={this.closeModal.bind(this)}
            >
                <Modal.Header>Sign in UGENE server</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Container>
                            {this.authCurrentMessage()}
                        </Container>
                        <Form.Field inline>
                            <label htmlFor="username">Username</label>
                            <Input type="username"
                                   name="username"
                                   id="username"
                                   placeholder="Username"
                                   value={username}
                                   onChange={this.handleChange}
                            />
                        </Form.Field>
                        <Form.Field inline>
                            <label htmlFor="username">Password</label>
                            <Input type="password"
                                   name="password"
                                   id="password"
                                   placeholder="Password"
                                   value={password}
                                   onChange={this.handleChange}
                            />
                        </Form.Field>
                        <Button disabled={authState.signedIn} onClick={e => this.handleSignIn(e)}>Login</Button>{' '}
                        <Button disabled={!authState.signedIn} onClick={e => this.handleSignOut(e)}>Logout</Button>
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
) (ModalSignIn);
