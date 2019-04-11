import React from 'react';

import {
    Card,
} from "semantic-ui-react";
import AppsCardAccordion from "./AppsCardAccordion";


class AppCard extends React.Component {
    render() {
        let app = this.props.app;

        return <Card fluid>
            <Card.Content>
                <Card.Header>Some application name</Card.Header>
                <Card.Meta style={{fontSize: "small"}}>
                    {app.id}
                </Card.Meta>
                <Card.Description> </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <a href="No results yet">No results yet</a>
            </Card.Content>
            <Card.Content extra>
                <AppsCardAccordion app={app}/>
            </Card.Content>
        </Card>
    }
}

export default AppCard;