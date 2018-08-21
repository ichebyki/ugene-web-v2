/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Button, Container, Form, Label, List, Input, Modal, Message, Grid } from 'semantic-ui-react';

import { authenticated, login, logout } from '../../data/modules/auth';
import type { AuthState, Role } from '../../data/modules/auth';
import { socketsConnect } from '../../middleware/socketActions';

type Props = {
    authState: AuthState,
    authenticated: (authData: { roles: Role[] }) => void,
    location: {
        state?: {
            nextPathname?: string
        }
    },
    history: {
        push: (path: string) => void
    },
    login: (username: string, password: string) => void,
    logout: () => void,
    socketsConnect:  () => void
};

type State = {
    authFailed: boolean,
    username: string,
    password: string
};

class SignIn extends React.Component<Props, State> {
    state = {
        authFailed: false,
        username: '',
        password: ''
    };

    handleOnSignIn(event) {
        event.preventDefault();

        const { username, password } = this.state;

        const u = username ? username.trim() : '';
        const p = password ? password.trim() : '';

        if (u.length === 0) {
            return;
        }

        this.props.login(u, p);
        // this.props.socketsConnect();
    }

    handleSignOut(event) {
        event.preventDefault();

        this.props.logout();
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

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
        const roleList = authState.roles.join();
        const roleListDiv = !authState.signedIn ? <div>Current roles: {roleList}</div> : '';

        if (this.props.authState.authFailure) {
            return this.authFailedMessage();
        } else if (this.props.authState.signedIn) {
            return this.authSucceededMessage();
        } else {
            const assignedRoles = this.props.authState.roles.map(item => {
                return <List.Item>{item}</List.Item>
            });

            return (
                <div>
                    <Message positive compact>
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

    }

    render() {

        const { username, password } = this.state;
        const { authState } = this.props;

        return (
            <div>
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
                    <Button disabled={authState.signedIn} onClick={e => this.handleOnSignIn(e)}>Login</Button>{' '}
                    <Button disabled={!authState.signedIn} onClick={e => this.handleSignOut(e)}>Logout</Button>
                </Form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        authState: state.auth
    };
}

/* Inject auth state and dispatch() into props */
export default withRouter(
    connect(mapStateToProps, { authenticated, login, logout, socketsConnect })(SignIn)
);
