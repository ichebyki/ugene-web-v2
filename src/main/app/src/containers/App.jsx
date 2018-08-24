import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Container } from "semantic-ui-react";

import { _EMPTY_, About, Help, SignIn, SignUp, SignOut, LeftSideBar } from '../constants/ActionTypes';
import * as ugeneActionsGlobal from '../actions/ActionsGlobal';
import * as ugeneActionsTabs from '../actions/ActionsTabs';

import UgeneTabPane from './ugene/TabPane';
import MenuBar from './ugene/MenuBar';
import UgeneModal from './ugene/Modals';
import UgeneLeftSideBar from "./ugene/LeftSideBar";
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
        const signedIn = this.props.appState.auth.signedIn;

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
                //this.props.actions.showLeftSideBar();
                this.setState({leftSideBarIsVisible: !this.state.leftSideBarIsVisible});
                break;
            default:
                break;
        }
    };

    handleLeftMenuClick(e, { name }) {
        console.log("handleLeftMenuClick - " + name);
        this.setState({leftSideBarIsVisible: false});
    }

    handleHideLeftMenu() {
        console.log("handleHideLeftMenu");
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
                <UgeneLeftSideBar className="ugene-app-left-side-bar"
                                  signedIn={this.props.appState.auth.signedIn}
                                  userName={this.props.appState.auth.username}
                                  visible={this.state.leftSideBarIsVisible}
                                  menuClick={this.handleLeftMenuClick.bind(this)}
                                  hideMenu={this.handleHideLeftMenu.bind(this)}>
                    <Container className="ugene-app-content-container"
                               fluid >
                        <UgeneTabPane className="ugene-app-tab-pane"
                                      actions={this.props.actions}
                                      renderActiveOnly tabs={tabs} />
                    </Container>
                </UgeneLeftSideBar>
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