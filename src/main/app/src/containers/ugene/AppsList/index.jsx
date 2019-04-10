import React from 'react';
import {Button, Container, Header, Icon, Grid} from 'semantic-ui-react';
import ScrollPane from "../ScrollPane";
import AppCard from "./AppCard";

const card_style = {minWidth: "32em"};

class AppsList extends React.Component {

    handleNewApp = (e, { name }) => {
        this.props.actions.appsadd();
    };

    render() {
        return (
            <ScrollPane>
                <Container style={{padding: "1em 3em 1em 3em"}}>
                    <br/>
                    <Header as='h2'>Header</Header>
                    <Grid stackable verticalAlign='top' columns={2}>
                        <Grid.Row>
                            <Grid.Column style={card_style}>
                                <AppCard actions={this.props.actions}/>
                            </Grid.Column>
                            <Grid.Column style={card_style}>
                                <AppCard actions={this.props.actions}/>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column style={card_style}>
                                <AppCard actions={this.props.actions}/>
                            </Grid.Column>
                            <Grid.Column textAlign='center' verticalAlign='middle' style={card_style}>
                                <Button icon
                                        labelPosition='left'
                                        primary size='small'
                                        onClick={this.handleNewApp.bind(this) /*нужна так как React с версии 0.14.x не привязывает this к компоненту.*/ }>
                                    <Icon name='tasks'/> Add Application
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </ScrollPane>
        );
    }
}

export default AppsList;