import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {Container, Tab as SemanticTab} from "semantic-ui-react";

import * as ugeneActionsGlobal from '../actions/ActionsGlobal';
import * as ugeneActionsTabs from '../actions/ActionsTabs';
import UgeneTabPane from './ugene/TabPane';
import MenuBar from './ugene/MenuBar';
import UgeneModal from './ugene/Modals';

import 'semantic-ui-css/semantic.min.css';
import '../style/Ugene.css';
import './App.css';



class App extends Component {

    static propTypes = {
        appState: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired
    };

    getModalName() {
        if (this.props.appState.ugeneMenuBar.activeMenuBarItem) {
            return this.props.appState.ugeneMenuBar.activeMenuBarItem;
        }
        return "";
    }

    closeModal() {
        this.props.actions.clearActiveMenuBarItem();
    }

    render() {
        const modalName = this.getModalName();
        const tabs = this.props.appState.ugeneTabs.tabs;

        return (
            <div className="ugene-application">
                <MenuBar {...this.props.actions} />
                <UgeneModal name={modalName} dimmer={'inverted'} onclose={this.closeModal.bind(this)} />
                <div>
                    <Container fluid>
                        <UgeneTabPane {...this.props.actions /* must be actions from props, not the following !!! ...ugeneActionsTabs*/}
                                      renderActiveOnly
                                      tabs={tabs} />
                    </Container>
                </div>
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
            ...ugeneActionsTabs
        },
        dispatch
    )
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (App);