import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Icon, Image, Menu, Segment, Sidebar, Dropdown, Accordion, Label, Input } from 'semantic-ui-react';

import LeftMenu from "./SideBarMenu";
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
                                  as={Segment}>
                    <Sidebar
                        as={Menu}
                        className={className + "-sidebar"}
                        animation='overlay'
                        direction='left'
                        vertical
                        inverted
                        visible={stateVisible}
                        onHide={this.handleSidebarHide.bind(this)}
                    >
                        <LeftMenu />
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