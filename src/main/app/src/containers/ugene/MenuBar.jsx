import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { Menu, Icon, Dropdown } from 'semantic-ui-react'

class MenuBar extends Component {

    static propTypes = {
        className: PropTypes.string.isRequired,
        signedIn: PropTypes.bool.isRequired,
        userName: PropTypes.string.isRequired,
        menuClick: PropTypes.func.isRequired
    };

    handleItemClick = (e, { name }) => {
        this.props.menuClick(name);
    };

    leftMenu = () => {
        return (
            <Menu.Menu position='left'>
                <Menu.Item as='a'
                           name={'SideBar'}
                           onClick={this.handleItemClick.bind(this)}
                >
                    <Icon name={'sidebar'} />
                </Menu.Item>
            </Menu.Menu>
        );
    };

    profileSubMenu(username) {
        if (!username) {
            return(
                <Menu.Item as='a'
                           name={'SignIn'}
                           onClick={this.handleItemClick.bind(this)}
                />
            )
        } else {
            const trigger = (<span><Icon name='user' /> Hello, {username}</span>);

            const options = [
                { key: 'profile',  text: 'Your Profile',  name: 'Your Profile', className: 'ugene-dropdown-item', onClick: this.handleItemClick.bind(this) },
                { key: 'settings', text: 'Settings', name: 'Settings',     className: 'ugene-dropdown-item', onClick: this.handleItemClick.bind(this) },
                { key: 'sign-out', text: 'Sign Out', name: 'Sign Out',     className: 'ugene-dropdown-item', onClick: this.handleItemClick.bind(this) }
            ];

            return(
                <Dropdown className={'ugene-dropdown'}
                          trigger={trigger}
                          options={options}
                          item
                          openOnFocus
                />
            );
        }
    }

    rightMenu = () => {
        const signedIn = this.props.signedIn;
        const username = signedIn ? this.props.userName : "";

        return (
            <Menu.Menu position='right'>
                <Menu.Item as='a'
                           name='About'
                           onClick={this.handleItemClick.bind(this) /*нужна так как React с версии 0.14.x не привязывает this к компоненту.*/ }
                />
                <Menu.Item as='a'
                           name='Help'
                           onClick={this.handleItemClick.bind(this)}
                />
                <Menu.Item>
                    {this.profileSubMenu(username)}
                </Menu.Item>
            </Menu.Menu>
        );
    };

    render() {
        const { className } = this.props;
        const menuLeft = this.leftMenu();
        const menuRight = this.rightMenu();

        return (
            <Menu className={className} attached='top' text>
                {menuLeft}
                {menuRight}
            </Menu>
        )
    }
}

export default MenuBar;