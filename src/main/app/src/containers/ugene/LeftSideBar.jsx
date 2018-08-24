import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Icon, Image, Menu, Segment, Sidebar, Dropdown, Accordion, Label, Input } from 'semantic-ui-react';

import "../App.css";

export default class LeftSideBar extends Component {

    static propTypes = {
        className: PropTypes.string.isRequired,
        visible: PropTypes.bool.isRequired,
        signedIn: PropTypes.bool.isRequired,
        userName: PropTypes.string.isRequired,
        menuClick: PropTypes.func.isRequired,
        hideMenu: PropTypes.func.isRequired
    };

    state = {
        visible: false
    };

    componentDidMount() {
        this.setState({visible: this.props.visible});
    }

    handleSidebarHide = () => {
        this.setState({ visible: false });
        this.props.hideMenu();
    };

    render() {
        const {
            className,
            visible,
            menuClick,
            hideMenu,
            signedIn,
            userName,
            ...otherProps
        } = this.props;

        const stateVisible = this.props.visible;

        return (
            <div className={className}>
                <Sidebar.Pushable className={className + "-pushable"}
                                  as={Menu}>
                    <Sidebar
                        className={className + "-sidebar"}
                        as={Menu}
                        animation='overlay'
                        direction='left'
                        vertical
                        inverted
                        visible={stateVisible}
                        onHide={this.handleSidebarHide.bind(this)}
                    >
                        <Menu.Item as='a' header>
                            File Permissions
                        </Menu.Item>
                        <Menu.Item as='a' name={'File'}     onClick={this.props.menuClick} >
                            <Dropdown text='File'>
                                <Dropdown.Menu>
                                    <Dropdown.Item text='New' />
                                    <Dropdown.Item text='Open...' description='ctrl + o' />
                                    <Dropdown.Item text='Save as...' description='ctrl + s' />
                                    <Dropdown.Item text='Rename' description='ctrl + r' />
                                    <Dropdown.Item text='Make a copy' />
                                    <Dropdown.Item icon='folder' text='Move to folder' />
                                    <Dropdown.Item icon='trash' text='Move to trash' />
                                    <Dropdown.Divider />
                                    <Dropdown.Item text='Download As...' />
                                    <Dropdown.Item text='Publish To Web' />
                                    <Dropdown.Item text='E-mail Collaborators' />
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Item>
                        <Menu.Item as='a' name={'Actions'}  onClick={this.props.menuClick} >
                            <Menu vertical>
                                <Menu.Item name='inbox' onClick={this.handleItemClick}>
                                    <Label color='teal'>1</Label>
                                    Inbox
                                </Menu.Item>

                                <Menu.Item name='spam' onClick={this.handleItemClick}>
                                    <Label>51</Label>
                                    Spam
                                </Menu.Item>

                                <Menu.Item name='updates' onClick={this.handleItemClick}>
                                    <Label>1</Label>
                                    Updates
                                </Menu.Item>
                                <Menu.Item>
                                    <Input icon='search' placeholder='Search mail...' />
                                </Menu.Item>
                            </Menu>
                        </Menu.Item>
                        <Menu.Item as='a' name={'Settings'} onClick={this.props.menuClick} >Settings</Menu.Item>
                        <Menu.Item as='a' name={'Tools'}    onClick={this.props.menuClick} >Tools   </Menu.Item>
                        <Menu.Item as='a' name={'Window'}   onClick={this.props.menuClick} >Window  </Menu.Item>
                    </Sidebar>

                    <Sidebar.Pusher className={className + "-pusher"}>
                        <Segment className={className + "-segment"}
                                 basic
                                 {...otherProps} />
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    }
}