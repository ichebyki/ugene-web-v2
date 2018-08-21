import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Container } from "semantic-ui-react";

import * as ugeneActions from '../actions/ActionsGlobal'
import UgeneTabPane from './ugene/TabPane/TabPane';
import MenuBar from './ugene/MenuBar';
import UgeneModal from './ugene/Modals';

import 'semantic-ui-css/semantic.min.css';
import '../style/Ugene.css';
import './App.css';

const UnitInfo =            <div>Unit Info content</div>
const Pilots =              <div>Pilots content</div>
const Mechs =               <div>Mechs content</div>
const UnitOrganization =    <div>Unit Organization content</div>


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
        const tabs = [
            {menuItem: { key: 'user', icon: 'user', content: 'user' },    content : UnitInfo,},
            {menuItem: { key: 'sidebar', icon: 'sidebar', content: 'sidebar' }, content : Pilots,},
            {menuItem: { key: 'world', icon: 'world', content: 'world' },   content : Mechs,},
            {menuItem: { key: 'users', icon: 'users', content: 'users' },   content : UnitOrganization,}
        ];

        const modalName = this.getModalName();

        return (
            <div className="ugene-application">
                <MenuBar {...this.props.actions} />
                <UgeneModal name={modalName} dimmer={'inverted'} onclose={this.closeModal.bind(this)} />
                <div>
                    <Container fluid>
                        <UgeneTabPane renderActiveOnly
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
    actions: bindActionCreators(ugeneActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (App);