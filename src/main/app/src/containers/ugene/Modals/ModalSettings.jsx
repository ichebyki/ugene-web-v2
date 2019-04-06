import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {Button, Container, Form, Input, Label, List, Message, Modal} from 'semantic-ui-react';
import {authenticated, authenticationFailure, login, logout} from '../../../data/modules/auth';
import * as Names from "../../../constants/Names";
import axios from "axios";
import {socketsConnect} from "../../../middleware/socketActions";
import jwt_decode from "jwt-decode";


class ModalSettings extends Component {

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
        userSettings: []
    };

    constructor(props) {
        super(props);
        this.handleUpdateSettings = this.handleUpdateSettings.bind(this);
    }

    componentDidMount() {
        let headerToken = `Bearer ${localStorage.getItem(Names.JWT_TOKEN)}`;
        axios.get(`/auth/settings/get`, {
            headers: {authorization: headerToken}
        }).then(
            res => {
                console.info(res.data);
                const userSettings = res.data;
                this.setState({userSettings});
            },
            failure => {
                console.error(`Failed to fetch settings: ${failure}`)
            }
        )
    }

    settingsFailedMessage() {
        if (!this.props.authState.authFailure) {
            return null;
        }

        return (
            <div>
                <Message negative compact>
                    <div>Please logging first</div>
                </Message>
                <br />
            </div>
        );
    }

    settingsSucceededMessage() {
        if (this.props.authState.signedIn) {
            return (
                <div>
                    <Message positive compact>
                        <List horizontal>
                        </List>
                    </Message>
                    <br />
                </div>
            )
        }

        return null;
    }

    settingsCurrentMessage() {
        const { authState } = this.props;

        if (authState.authFailure) {
            return this.settingsFailedMessage();
        } else if (authState.signedIn) {
            return this.settingsSucceededMessage();
        } else {
            return (
                <div>
                    <List horizontal>
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

    getUserSettingsFields(p) {
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

                        if (key === 'username' || key === 'id') {
                            return <Input key={key}
                                       name={key}
                                       id={key}
                                       placeholder={key}
                                       value={s[key]}
                                       ref={key}
                                       onChange={handleChange}
                                       readOnly={'true'}
                                       type={'hidden'}
                                />
                        }
                        return <Form.Field key={key} inline>
                            <Label htmlFor={key} width={10}>{key}</Label>
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
                    if (key === 'username' || key === 'id') {
                        return <Input key={key}
                                   name={key}
                                   id={key}
                                   placeholder={key}
                                   value={s[key]}
                                   ref={key}
                                   onChange={handleChange}
                                   readOnly={'true'}
                                   type={'hidden'}
                            />
                    }
                    return <Form.Field key={key} inline>
                        <Label htmlFor={key} style={{width: "10em", background: "transparent"}}>{key}</Label>
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

    handleUpdateSettings(e) {
        e.preventDefault();

        const formData = {};
        for (const field in this.refs) {
            formData[field] = this.refs[field].props.value;
        }

        if (formData) {
            const {userSettings} = this.state;

            let headerToken = `Bearer ${localStorage.getItem(Names.JWT_TOKEN)}`;
            axios.post('/auth/settings/put',
                formData,
                {headers: {authorization: headerToken}})
                .then(
                    success => {
                        const userSettings = success.data;
                    },
                    failure => {
                        console.error(`Failed to put new settings values: ${failure}`)
                    }
                );
        }
    };

    render() {
        const { userSettings } = this.state;
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
                <Modal.Header>Settings</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.handleUpdateSettings}>
                        <Form.Field inline>
                            {this.getUserSettingsFields(userSettings)}
                        </Form.Field>
                        <Button disabled={!authState.signedIn} onClick={e => this.handleUpdateSettings(e)}>Update</Button>
                        <Button disabled={false} onClick={e => this.handleClose(e)}>Close</Button>
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
) (ModalSettings);
