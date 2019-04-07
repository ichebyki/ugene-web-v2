import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {Button, Container, Form, Input, Label, List, Message, Modal} from 'semantic-ui-react';
/*import {loggedOut} from '../../../data/modules/auth';*/
import {authenticated, authenticationFailure, login, logout} from '../../../data/modules/auth';
import * as Names from "../../../constants/Names";
import axios from "axios";
import {socketsConnect} from "../../../middleware/socketActions";
import jwt_decode from "jwt-decode";


class ModalProfile extends Component {

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
        userProfile: []
    };

    constructor(props) {
        super(props);
        this.handleUpdateProfile = this.handleUpdateProfile.bind(this);
    }

    componentDidMount() {
        let headerToken = `Bearer ${localStorage.getItem(Names.JWT_TOKEN)}`;
        axios.get(`/auth/profile/get`, {
            headers: {authorization: headerToken}
        }).then(
            res => {
                console.info(res.data);
                const userProfile = res.data;
                this.setState({userProfile});
            },
            failure => {
                console.error(`Failed to fetch profile: ${failure}`)
            }
        )
    }

    handleProfile(event) {
        event.preventDefault();

        const { authState } = this.props;
        if (authState.signedIn) {
            this.props.profile(authState.username, '');
        }
        else {
            return;
        }

        /*this.closeModal();*/
    }

    titleMessage() {
        const { authState } = this.props;
        if (authState.signedIn) {
            return (
                <span>{this.props.authState.username}</span>
            )
        } else {
            return (
                <span>Not signed in</span>
            )
        }
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

    handleUpdate = (e) => {
        e.preventDefault();
        this.closeModal();
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

    getUserProfileFields(p) {
        if (p) {
            let s = p;
            let handleChange = this.handleChange;
            let state = this.state;

            Object.keys(p).map(function(key) {
                if (state[key]) {
                    s[key] = state[key];
                }
            });
            return Object.keys(s).map(function(key) {
                if (s[key] instanceof Array
                    || Object.prototype.toString.call(s[key]) === '[object Array]'
                    || Array.isArray(s[key])) {
                    let str = ''
                    if (key !== 'authorities') {
                        s[key].map(item => {
                            if (item['authority']) {
                                str = str + " " + item['authority'];
                            }
                            return item;
                        });
                        let readOnly = 'false';
                        if (key == 'username') {
                            readOnly = 'true';
                        }
                        return <Form.Field key={key} inline>
                            <Label htmlFor={key} width={6}>{key}</Label>
                            <Input type={key}
                                   name={key}
                                   id={key}
                                   placeholder={key}
                                   value={str}
                                   ref={key}
                                   readOnly={readOnly}
                                   onChange={handleChange}
                            />
                        </Form.Field>
                    }
                }
                else {
                    return <Form.Field key={key} inline>
                        <Label htmlFor={key} style={{ width: "6em", background: "transparent" }}>{key}</Label>
                        <Input type={key}
                               name={key}
                               id={key}
                               placeholder={key}
                               value={s[key]}
                               ref={key}
                               onChange={handleChange}
                        />
                    </Form.Field>
                }
            });
        }
    };

    handleUpdateProfile(e) {
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

    render() {
        const { userProfile } = this.state;
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
                <Modal.Header>User profile</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.handleUpdateProfile}>
                        <Container>
                            {this.authCurrentMessage()}
                        </Container>
                        <Form.Field inline>
                            {this.getUserProfileFields(userProfile)}
                        </Form.Field>
                        <Button positive disabled={!authState.signedIn} onClick={e => this.handleUpdateProfile(e)}>Update</Button>
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
) (ModalProfile);
