import React from 'react';
import {Button, Table, Container, Header, Icon, Accordion, Label, Message} from 'semantic-ui-react';
import ScrollPane from "../ScrollPane";

const panels = [{
    key: `panel-1`,
    title: {
        content: <Label content={"Dynamic coverage"} />,
    },
    content: {
        content: <Message info header={'xxxxxxxxxx'} content={'zzzzzzzzzzz vvvvvv wwwwwwwwwwww'} />,
    },
}]

class AppsList extends React.Component {

    render() {
        return (
            <ScrollPane>
                <Container>
                    <br/>
                    <Header as='h2'>Header</Header>
                    <Table fixed size='large' celled definition>
                        <Table.Header fullWidth>
                            <Table.Row>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Id</Table.HeaderCell>
                                <Table.HeaderCell width={7}>Dynamic coverage</Table.HeaderCell>
                                <Table.HeaderCell>Static coverage</Table.HeaderCell>
                                <Table.HeaderCell>Results</Table.HeaderCell>
                                <Table.HeaderCell width={1}>
                                </Table.HeaderCell>
                                <Table.HeaderCell width={1}>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>John Lilki</Table.Cell>
                                <Table.Cell>September 14, 2013</Table.Cell>
                                <Table.Cell>
                                    <Accordion defaultActiveIndex={1} panels={panels} />
                                </Table.Cell>
                                <Table.Cell style={{ padding: "2px" }}>
                                    <Button fluid compact size='small' style={{ margin: "2px" }}>
                                        Start static
                                    </Button>
                                    <Button fluid compact size='small' style={{ margin: "2px" }}>
                                        Generate static
                                    </Button>
                                </Table.Cell>
                                <Table.Cell><a href="No">No</a></Table.Cell>
                                <Table.Cell collapsing>
                                    <Icon name={'edit'}/>
                                </Table.Cell>
                                <Table.Cell collapsing>
                                    <Icon name={'delete'}/>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Jamie Harington</Table.Cell>
                                <Table.Cell>January 11, 2014</Table.Cell>
                                <Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
                                <Table.Cell>Yes</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Jill Lewis</Table.Cell>
                                <Table.Cell>May 11, 2014</Table.Cell>
                                <Table.Cell>jilsewris22@yahoo.com</Table.Cell>
                                <Table.Cell>Yes</Table.Cell>
                            </Table.Row>
                        </Table.Body>

                        <Table.Footer fullWidth>
                            <Table.Row>
                                <Table.HeaderCell colSpan='7'>
                                    <Button floated='right' icon labelPosition='left' primary size='small'>
                                        <Icon name='tasks'/> Add Application
                                    </Button>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                </Container>
            </ScrollPane>
        );
    }
}

export default AppsList;