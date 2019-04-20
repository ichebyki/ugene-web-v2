import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {About, Help, SignIn, Profile, Settings, AppsAdd} from '../../../constants/ActionTypes';
import ModalAbout from './ModalAbout';
import ModalHelp from './ModalHelp';
import ModalSignIn from './ModalSignIn';
import ModalProfile from './ModalProfile';
import ModalSettings from './ModalSettings';
import ModalAppsEdit from "../AppsList/ModalAppsAdd";

export default class UgeneModal extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        dimmer: PropTypes.string,
        closeIcon: PropTypes.any.isRequired,
        onclose: PropTypes.func.isRequired
    };

    render() {
        const dimmer = this.props.dimmer ? this.props.dimmer : 'blurring';
        const centered = this.props.centered ? this.props.centered : false;
        switch (this.props.name) {
            case About:
                return (
                    <ModalAbout open={true} centered={centered} dimmer={dimmer} closeIcon={this.props.closeIcon} onclose={this.props.onclose} />
                );
            case Help:
                return (
                    <ModalHelp open={true} centered={centered} dimmer={dimmer} closeIcon={this.props.closeIcon} onclose={this.props.onclose} />
                );
            case SignIn:
                return (
                    <ModalSignIn open={true} centered={centered} dimmer={dimmer} closeIcon={this.props.closeIcon} onclose={this.props.onclose} />
                );
            case Profile:
                return (
                    <ModalProfile open={true} centered={centered} dimmer={dimmer} closeIcon={this.props.closeIcon} onclose={this.props.onclose} />
                );
            case Settings:
                return (
                    <ModalSettings open={true} centered={centered} dimmer={dimmer} closeIcon={this.props.closeIcon} onclose={this.props.onclose} />
                );
            case AppsAdd:
                return (
                    <ModalAppsEdit open={true} centered={centered} dimmer={dimmer} closeIcon={this.props.closeIcon} onclose={this.props.onclose} />
                );
            default:
                break;
        }
        return null;
    }
}
