import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { List, Menu, Message, Icon, Dropdown } from 'semantic-ui-react'

import { logout } from '../../data/modules/auth';
import * as ugeneActions from '../../actions/ActionsGlobal'

class MenuBar extends Component {

    static propTypes = {
        appState: PropTypes.object.isRequired,
        showAbout: PropTypes.func.isRequired,
        showHelp: PropTypes.func.isRequired,
        signIn: PropTypes.func.isRequired,
        signOut: PropTypes.func.isRequired,
        signUp: PropTypes.func.isRequired
    };

    handleItemClick = (e, { name }) => {
        switch (name) {
            case "About":
                this.props.showAbout();
                break;
            case "Help":
                this.props.showHelp();
                break;
            case "SignIn":
                this.props.signIn();
                break;
            case "SignOut":
            case "Sign Out":
                this.props.signOut();
                this.props.logout();
                break;
            default:
                break;
        }
    };

    leftMenu = () => {
        return (
            <Menu.Menu position='left'>
                <Menu.Item as='a' header>
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
                { key: 'profile',  text: 'Profile',  name: 'Your Profile', onClick: this.handleItemClick.bind(this) },
                { key: 'settings', text: 'Settings', name: 'Settings',     onClick: this.handleItemClick.bind(this) },
                { key: 'sign-out', text: 'Sign Out', name: 'Sign Out',     onClick: this.handleItemClick.bind(this) }
            ];

            return(
                <Dropdown trigger={trigger}
                          options={options}
                          className={'icon'}
                          item
                          openOnFocus
                />
            );
        }
    }

    rightMenu = () => {
        const signedIn = this.props.appState.auth.signedIn;
        const username = signedIn ? this.props.appState.auth.username : "";

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
        const menuLeft = this.leftMenu();
        const menuRight = this.rightMenu();

        return (
            <Menu attached='top' text>
                {menuLeft}
                {menuRight}
            </Menu>
        )
    }
}

const mapStateToProps = state => ({
    appState: state
});

/*const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ugeneActions, dispatch)
});*/

export default connect(
    mapStateToProps/*,
    mapDispatchToProps*/,
    { logout }
) (MenuBar);