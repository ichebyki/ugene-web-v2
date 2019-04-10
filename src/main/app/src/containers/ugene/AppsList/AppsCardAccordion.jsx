import React from 'react';

import {
    Accordion,
    Button, Card,
    Dropdown,
    Form,
    Grid,
    Header,
    Input,
    Label
} from "semantic-ui-react";


class AppsCardAccordion extends React.Component {
    state = {checkboxRadioGroup: ''};

    handleChange = (e, { name, value }) => {
        if (name === "checkboxRadioGroup") {
            /*this.setState({ [name]: value });*/
            this.setState({ checkboxRadioGroup : value });
            this.updateContent(value);
        }
    };

    componentWillMount() {
        this.updateContent('');
    }

    updateContent(checkBoxValue) {
        const optionsTestscript = [
            {
                key: 1,
                text: '.../test.sh',
                value: 1,
                content: <Header icon='file code' content='Script to run tests' subheader='/media/sf_share/unipro/Jazz/sonar-scanning-examples/sonarqube-scanner-maven/app-java/test.sh' />,
            },
            {
                key: 2,
                text: 'Script',
                value: 2,
                content: <Header icon='file code' content='Script to run tests' subheader='The size in the middle' />,
            },
            {
                key: 3,
                text: 'Manual',
                value: 3,
                content: <Header icon='terminal' content='Manual run' subheader='Start application manually' />,
            },
        ]

        const dropOptionsX = [
            { key: 1, text: 'Choice 1', value: 1 },
            { key: 2, text: 'Choice 2', value: 2 },
            { key: 3, text: 'Choice 3', value: 3 },
        ];

        const padd = {
            padding: "0.1em"
        };

        this.setState({
            panels: [
                {
                    key: `panel-dynamic`,
                    title: {
                        content: <span style={{fontSize: "1.2em"}}>Dynamic coverage</span>,
                    },
                    content: {
                        style: {
                            paddingTop: "0.8em",
                        },
                        content:
                            <Form>
                                <Grid columns={2} style={padd}>
                                    <Grid.Row style={padd}>
                                        <Grid.Column textAlign='right' style={padd}>
                                            <Dropdown placeholder='How to run' button basic floating
                                                      options={optionsTestscript}/>
                                        </Grid.Column>
                                        <Grid.Column style={padd}>
                                            <Button>Start manual testing</Button>
                                        </Grid.Column>
                                    </Grid.Row>

                                    <Grid.Row style={padd}>
                                        <Grid.Column textAlign='right' style={padd}>
                                            <Dropdown placeholder='Select previous run...' button basic floating
                                                      options={dropOptionsX}/>
                                        </Grid.Column>
                                        <Grid.Column style={padd}>
                                            <Button>Load result</Button>
                                        </Grid.Column>
                                    </Grid.Row>

                                    <Grid.Row style={padd}>
                                        <Grid.Column textAlign='right' style={padd}>
                                            <Input type='text' placeholder=' '/>
                                        </Grid.Column>
                                        <Grid.Column style={padd}>
                                            <Button type='submit'>Save results</Button>
                                        </Grid.Column>
                                    </Grid.Row>

                                    <Grid.Row style={padd}>
                                        <Grid.Column textAlign='right' style={padd}>
                                        </Grid.Column>
                                        <Grid.Column style={padd}>
                                            <Button type='submit'>Reset results</Button>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Form>,
                    },
                },
                {
                    key: `panel-static`,
                    title: {
                        content: <span style={{fontSize: "1.2em"}}>Static coverage</span>,
                    },
                    content: {
                        style: {
                            paddingTop: "0.8em",
                        },
                        content:
                            <Form>
                                <Grid columns={2} style={padd}>
                                    <Grid.Row style={padd}>
                                        <Grid.Column textAlign='right' style={padd}>
                                            <Button size='small'>
                                                Start static
                                            </Button>
                                        </Grid.Column>
                                        <Grid.Column style={padd}>
                                            <Button size='small'>
                                                Generate static
                                            </Button>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Form>,
                    },
                },
            ]
        });
    }

    render() {
        return <Accordion style={{paddingBottom: "0.8em"}}
                          as={Form.Field}
                          defaultActiveIndex={1}
                          panels={this.state.panels} />
    }
}

export default AppsCardAccordion;