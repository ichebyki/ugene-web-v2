import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { About, Help, SignIn, Profile } from '../../../constants/ActionTypes';
import ModalAbout from './ModalAbout';
import ModalHelp from './ModalHelp';
import ModalSignIn from './ModalSignIn';
import ModalProfile from './ModalProfile';

export default class UgeneModal extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        dimmer: PropTypes.string,
        closeIcon: PropTypes.any.isRequired,
        onclose: PropTypes.func.isRequired
    };

    render() {
        const dimmer = this.props.dimmer ? this.props.dimmer : 'inverted';
        switch (this.props.name) {
            case About:
                return (
                    <ModalAbout open={true} dimmer={dimmer} closeIcon={this.props.closeIcon} onclose={this.props.onclose} />
                );
            case Help:
                return (
                    <ModalHelp open={true} dimmer={dimmer} closeIcon={this.props.closeIcon} onclose={this.props.onclose} />
                );
            case SignIn:
                return (
                    <ModalSignIn open={true} dimmer={dimmer} closeIcon={this.props.closeIcon} onclose={this.props.onclose} />
                );
            case Profile:
                return (
                    <ModalProfile open={true} dimmer={dimmer} closeIcon={this.props.closeIcon} onclose={this.props.onclose} />
                );
            default:
                break;
        }
        return null;
    }
}
