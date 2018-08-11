import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class MenuBar extends Component {
    state = { activeItem: 'closest' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
            <Menu attached='top' text>
                <Menu.Item as='a' header>Sort By</Menu.Item>
                <Menu.Item as='a'
                    name='closest'
                    active={activeItem === 'closest'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item as='a'
                    name='mostComments'
                    active={activeItem === 'mostComments'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item as='a'
                    name='mostPopular'
                    active={activeItem === 'mostPopular'}
                    onClick={this.handleItemClick}
                />
            </Menu>
        )
    }
}
