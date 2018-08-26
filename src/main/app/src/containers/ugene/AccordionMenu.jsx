import React, { Component } from 'react';

import { Accordion, Menu } from 'semantic-ui-react';

import './AccordionMenu.css';


const ColorForm = (
    <Form className="indent">
        <Form.Group grouped>
            <Form.Checkbox label='Red' name='color' value='red' />
            <Form.Checkbox label='Orange' name='color' value='orange' />
            <Form.Checkbox label='Green' name='color' value='green' />
            <Form.Checkbox label='Blue' name='color' value='blue' />
        </Form.Group>
    </Form>
);

const SizeForm = (
    <Form className="indent">
        <Form.Group grouped>
            <Label label='Small' name='size' value='small' />
            <Form.Radio label='Medium' name='size' type='radio' value='medium' />
            <Form.Radio label='Large' name='size' type='radio' value='large' />
            <Form.Radio label='X-Large' name='size' type='radio' value='x-large' />
        </Form.Group>
    </Form>
);


class AccordionExampleNested extends Component {
    state = {activeIndex: [0, -1]};

    handleClick = (e, props) => {
        const {index2} = props;
        const {activeIndex} = this.state;
        const newIndex = this.isActive(index2) ? [0,-1] : index2;

        this.setState({activeIndex: newIndex})
    };

    isActive = (a) =>  {
        if (a[0] === 0
            && this.state.activeIndex[1] === a[1]) return true;
        if (a[0] === 1 && this.state.activeIndex[0] > 0
            && this.state.activeIndex[1] === a[1]
            && this.state.activeIndex[2] === a[2]) return true;

        if (a[0] === this.state.activeIndex[0]) {
            if (a[1] === this.state.activeIndex[1]) {
                if (a[0] === 0) {
                    return true;
                }
                else {
                    if (a[2] === this.state.activeIndex[2]) {
                        if (a[0] === 1) {
                            return true;
                        }
                        else {
                            if (a[3] === this.state.activeIndex[3]) {
                                if (a[0] === 2) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
        return false;
    };

    render() {
        const {activeIndex} = this.state;

        return (
    <Accordion
        as={Menu}
        inverted
        vertical>
        <Menu.Item>
            <Accordion.Title
                active={this.isActive([0,0])}
                content='Size'
                index={'[0,0]'}
                index2={[0,0]}
                onClick={this.handleClick}
            />
            <Accordion.Content active={this.isActive([0,0])}>
                <Accordion className="indent"
                           as={Menu}
                           inverted
                           vertical>
                    <Menu.Item>
                        <Accordion.Title
                            active={this.isActive([1,0,0])}
                            content='Size -2'
                            index={'[1,0,0]'}
                            index2={[1,0,0]}
                            onClick={this.handleClick}
                        />
                        <Accordion.Content active={this.isActive([1,0,0])} content={SizeForm}/>
                    </Menu.Item>

                    <Menu.Item>
                        <Accordion.Title
                            active={this.isActive([1,0,1])}
                            content='Colors - 2'
                            index={'[1,0,1]'}
                            index2={[1,0,1]}
                            onClick={this.handleClick}
                        />
                        <Accordion.Content active={this.isActive([1,0,1])} content={ColorForm}/>
                    </Menu.Item>
                </Accordion>
            </Accordion.Content>
        </Menu.Item>

        <Menu.Item>
            <Accordion.Title
                active={this.isActive([0,1])}
                content='Colors'
                index={'[0,1]'}
                index2={[0,1]}
                onClick={this.handleClick}
            />
            <Accordion.Content active={this.isActive([0,1])} content={ColorForm}/>
        </Menu.Item>
    </Accordion>
);

export default AccordionExampleNested;

/* https://stackblitz.com/edit/nested-accordion-semantic-ui?file=index.js */
