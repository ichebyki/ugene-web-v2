import React from 'react';

import {
    Accordion,
    Button, Card,
    Checkbox,
    Dropdown,
    Form,
    Grid,
    Header,
    Image,
    Input,
    Label,
    Select, Table
} from "semantic-ui-react";
import AppsCardAccordion from "./AppsCardAccordion";


class AppCard extends React.Component {
    render() {
        return <Card fluid>
            <Card.Content>
                <Card.Header>Some application name</Card.Header>
                <Card.Meta style={{fontSize: "small"}}>
                    d764c8cc-e932-45c4-c58d-7aa05d83f3ea
                </Card.Meta>
                <Card.Description> </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <a href="No results yet">No results yet</a>
            </Card.Content>
            <Card.Content extra>
                <AppsCardAccordion />
            </Card.Content>
        </Card>
    }
}

export default AppCard;