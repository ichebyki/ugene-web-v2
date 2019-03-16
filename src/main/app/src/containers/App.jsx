import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Container } from "semantic-ui-react";

import { LeftSideBar } from '../constants/ActionTypes';
import * as ugeneActionsGlobal from '../actions/ActionsGlobal';
import * as ugeneActionsTabs from '../actions/ActionsTabs';

import UgeneTabPane from './ugene/TabPane';
import MenuBar from './ugene/MenuBar';
import UgeneModal from './ugene/Modals';
import UgeneSideBar from "./ugene/SideBar";
import { logout } from '../data/modules/auth';

import 'semantic-ui-css/semantic.min.css';
import '../style/Ugene.css';
import './App.css';



class App extends Component {

    static propTypes = {
        appState: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired
    };

    state = {
        leftSideBarIsVisible: false
    };

    componentDidMount() {
        if (this.props.appState.ugeneMenuBar.activeMenuBarItem
            && this.props.appState.ugeneMenuBar.activeMenuBarItem === LeftSideBar)
        {
            this.setState({leftSideBarIsVisible: !this.state.leftSideBarIsVisible});
        }
        else {
            this.setState({leftSideBarIsVisible: false});
        }
    }

    checkActiveMenu() {
        if (this.props.appState.ugeneMenuBar.activeMenuBarItem) {
            return this.props.appState.ugeneMenuBar.activeMenuBarItem;
        }
        return "";
    }

    closeModal() {
        this.props.actions.clearActiveMenuBarItem();
    }



    handleMenuBarClick = (name) => {
        switch (name) {
            case "About":
                this.props.actions.showAbout();
                break;
            case "Help":
                this.props.actions.showHelp();
                break;
            case "SignIn":
                this.props.actions.signIn();
                break;
            case "SignOut":
            case "Sign Out":
                this.props.actions.signOut();
                this.props.actions.logout();
                break;
            case "SideBar":
                this.setState({leftSideBarIsVisible: !this.state.leftSideBarIsVisible});
                break;
            case "Your Profile":
                this.props.actions.profile();
                break;
            case "Settings":
                console.log("handleMenuBarClick: name=" + name);
                this.setState({leftSideBarIsVisible: !this.state.leftSideBarIsVisible});
                break;
            default:
                console.log("handleMenuBarClick: name=" + name);
                break;
        }
    };

    handleLeftMenuClick(e, { name, action }) {
        if (action && this["props"]["actions"][action]) {
            this["props"]["actions"][action]();
        }
        else {
            console.log('handleLeftMenuClick: action=undefined, name=' + name);
        }
        this.setState({leftSideBarIsVisible: false});
    }

    handleHideLeftMenu() {
        this.setState({leftSideBarIsVisible: false});
    }

    render() {
        const modalName = this.checkActiveMenu();
        const tabs = this.props.appState.ugeneTabs.tabs;

        return (
            <div className="ugene-app">
                <UgeneModal className="ugene-app-modal"
                            name={modalName}
                            dimmer={'inverted'}
                            closeIcon={true}
                            onclose={this.closeModal.bind(this)} />
                <MenuBar className="ugene-app-menu-bar"
                         signedIn={this.props.appState.auth.signedIn}
                         userName={this.props.appState.auth.username}
                         menuClick={this.handleMenuBarClick.bind(this)} />
                <UgeneSideBar className="ugene-app-left-side-bar"
                              kind={'left'}
                              signedIn={this.props.appState.auth.signedIn}
                              userName={this.props.appState.auth.username}
                              visible={this.state.leftSideBarIsVisible}
                              menuClick={this.handleLeftMenuClick.bind(this)}
                              hideMenu={this.handleHideLeftMenu.bind(this)}>
                    <Container className="ugene-app-content-container"
                               fluid >
                        <UgeneTabPane className="ugene-app-tab-pane"
                                      actions={this.props.actions}
                                      renderActiveOnly
                                      tabs={tabs} />
                    </Container>
                </UgeneSideBar>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    appState: state
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
        {
            ...ugeneActionsGlobal,
            ...ugeneActionsTabs,
            logout
        },
        dispatch
    )
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (App);