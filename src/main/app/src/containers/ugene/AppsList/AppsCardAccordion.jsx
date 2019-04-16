import React from 'react';

import {
    Accordion,
    Button,
    Dropdown,
    Form,
    Grid,
    Header,
    Input
} from "semantic-ui-react";


class AppsCardAccordion extends React.Component {
    startStaticReady = 'Start static';
    startStaticStarted = 'Static started...';
    startStaticCompleted = 'Static completed';
    generateStaticReady = 'Generate static';
    generateStaticStarted = 'Generate started...';
    generateStaticCompleted = 'Generate completed';

    state = {
        checkboxRadioGroup: '',
        startStaticText: this.startStaticReady,
        generateStaticText: this.generateStaticReady,
    };

    componentWillReceiveProps(props) {
        const { refresh } = this.props;
        if (props.refresh !== refresh) {
            this.updateContent();
        }
    }

    handleChange = (e, { name, value }) => {
        if (name === "checkboxRadioGroup") {
            this.setState({ checkboxRadioGroup : value });
            this.updateContent();
        }
    };

    componentWillMount() {
        this.updateContent();
    }

    updateContent() {
        const app = this.props.app;
        const size_header = 'tiny';
        const size_str = 16;
        let i = 0;

        const optionsTestScript = app.testPathList.map(item => {
            let str = '';
            if (item.length > size_str) {
                str = '...' + item.substring(item.length - size_str);
            }
            else {
                str = item.substring(-1);
            }
            return {
                key: ++i,
                text: str,
                value: i,
                content: <Header size={size_header} icon='file code'
                                 content={i.toString() + '. Script to run tests'}
                                 subheader={item} />,
            };
        });
        optionsTestScript.push({
                key: ++i,
                text: 'Manual run',
                value: i,
                content: <Header size={size_header} icon='terminal'
                                 content={i.toString() + '. Manual run'}
                                 subheader='Start application manually' />,
            });

        const dropOptionsX = [
            { key: 1, text: 'Choice 1', value: 1 },
            { key: 2, text: 'Choice 2', value: 2 },
            { key: 3, text: 'Choice 3', value: 3 },
        ];

        const padd = {
            padding: "0.1em"
        };

        /*
            STATIC_ANALYZE_NOT_RUN,
            STATIC_ANALYZE_STARTED,
            STATIC_ANALYZE_COMPLETED,
            STATIC_REPORT_NOT_RUN,
            STATIC_REPORT_STARTED,
            STATIC_REPORT_READY
         */
        if (app.staticstate === 'STATIC_REPORT_READY') {
            this.setState({ startStaticText: this.startStaticCompleted,
                              generateStaticText: this.generateStaticCompleted } );
        }
        else if (app.staticstate === 'STATIC_REPORT_STARTED') {
            this.setState({ startStaticText: this.startStaticCompleted,
                              generateStaticText: this.generateStaticStarted } );
        }
        else if (app.staticstate === 'STATIC_REPORT_NOT_RUN'
                 || app.staticstate === 'STATIC_ANALYZE_COMPLETED') {
            this.setState({ startStaticText: this.startStaticCompleted,
                              generateStaticText: this.generateStaticReady } );
        }
        else if (app.staticstate === 'STATIC_ANALYZE_STARTED') {
            this.setState({ startStaticText: this.startStaticStarted,
                              generateStaticText: this.generateStaticReady } );
        }
        else if (app.staticstate === 'STATIC_ANALYZE_NOT_RUN') {
            this.setState({ startStaticText: this.startStaticReady,
                              generateStaticText: this.generateStaticReady } );
        }

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
                                                      options={optionsTestScript}/>
                                        </Grid.Column>
                                        <Grid.Column style={padd}>
                                            <Button>Start testing</Button>
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
                                            <Button size='small'
                                                    content={this.state.startStaticText}
                                                    onClick={(e, d) => {
                                                        this.props.onRunStaticClick(e, d, this.props.app, this);
                                                    }}/>
                                        </Grid.Column>
                                        <Grid.Column style={padd}>
                                            <Button size='small'
                                                    content={this.state.generateStaticText}
                                                    onClick={(e, d) => {
                                                        this.props.onGetStaticReport(e, d, this.props.app, this);
                                                    }}/>
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