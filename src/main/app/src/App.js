import React, { Component } from 'react';
import {
    Container
} from "semantic-ui-react";

import './App.css';
import TabPane from './containers/ugene/TabPane/TabPane';
import MenuBar from './containers/ugene/MenuBar';


const UnitInfo = () => <div>Unit Info content</div>;
const Pilots = () => <div>Pilots content</div>;
const Mechs = () => <div>Mechs content</div>;
const UnitOrganization = () => <div>Unit Organization content</div>;

class App extends Component {
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