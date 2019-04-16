import React from 'react';

import {
    Button,
    Card,
} from "semantic-ui-react";
import AppsCardAccordion from "./AppsCardAccordion";


class AppCard extends React.Component {

    state = {
        app: null,
        resultLink: '',
        refresh: false,
    };

    constructor(props) {
        super(props);

        const { app } = this.props;
        if (app) {
            this.state.app = app;
        }
    }

    componentWillReceiveProps(props) {
        const { refresh } = this.props;
        if (props.refresh !== refresh) {
            this.updateApp(this.props.app);
        }
    }

    deleteApp(app) {
        if (this.props.deleteapp) {
            this.props.deleteapp(app);
        }
    }

    editApp(app) {
        if (this.props.editapp) {
            this.props.editapp(app);
        }
    }

    updateApp(app) {
        if (app.staticstate !== 'STATIC_REPORT_READY') {
            let resultLink = <a href={'#'}>No results yet</a>
            this.setState({resultLink: resultLink});
        } else {
            let resultLink = <a href={'#'}>Results are ready</a>
            this.setState({resultLink: resultLink});
        }
        this.setState({app: app});
    }

    render() {
        const { app } = this.state;
        const { refresh } = this.props;

        return <Card style={this.props.style}>
            <Card.Content>
                <Button color='red'   basic circular size='mini' floated='right' icon={'delete'} onClick={e => this.deleteApp(app)}/>
                <Button color='green' basic circular size='mini' floated='right' icon={'edit'}   onClick={e => this.editApp(app)}/>

                <Card.Header>{app.name}</Card.Header>
                <Card.Meta style={{fontSize: "small"}}>
                    {app.id}
                </Card.Meta>
                <Card.Description> </Card.Description>
            </Card.Content>
            <Card.Content extra>
                {this.state.resultLink}
            </Card.Content>
            <Card.Content extra>
                <AppsCardAccordion app={app}
                                   onRunStaticClick={this.props.onRunStaticClick}
                                   onGetStaticReport={this.props.onGetStaticReport}
                                   refresh={{refresh}}/>
            </Card.Content>
        </Card>
    }
}

export default AppCard;