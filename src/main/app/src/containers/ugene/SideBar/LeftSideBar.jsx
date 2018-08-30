import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Segment, Sidebar } from 'semantic-ui-react';

import SideBarMenu from "./SideBarMenu";

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

    onClickMenu = (e, props) => {
        this.setState({ visible: false });
        this.props.hideMenu();
        this.props.menuClick(e, props);
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
                        visible={stateVisible}
                        onHide={this.handleSidebarHide.bind(this)}
                    >
                        <SideBarMenu kind={'left'} onClickMenu={this.onClickMenu} />
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