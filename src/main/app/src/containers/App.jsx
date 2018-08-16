import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Container } from "semantic-ui-react";

import '../style/Ugene.css';
import TabPane from './ugene/TabPane/TabPane';
import MenuBar from './ugene/MenuBar';


const UnitInfo = () => <div>Unit Info content</div>;
const Pilots = () => <div>Pilots content</div>;
const Mechs = () => <div>Mechs content</div>;
const UnitOrganization = () => <div>Unit Organization content</div>;

connect(state => ({
    windowslist: state.windowslist
}));

class App extends Component {

    static propTypes = {
        store: PropTypes.object.isRequired,
        windowslist: PropTypes.object.isRequired,
    }

    render() {
        const tabs = [
            {name : "unitInfo", label : "Unit Info", component : UnitInfo,},
            {name : "pilots", label : "Pilots", component : Pilots,},
            {name : "mechs", label : "Mechs", component : Mechs,},
            {name : "unitOrganization", label : "Unit Organization", component : UnitOrganization,}
        ];

        return (
            <div className="App">
                <MenuBar/>
                <Container>
                    <TabPane tabs={tabs} size="massive" />
                </Container>
            </div>
        );
    }
}

export default App;