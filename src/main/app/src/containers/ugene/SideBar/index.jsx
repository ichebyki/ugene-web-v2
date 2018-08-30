import React, { Component } from 'react';

import LeftSideBar from "./LeftSideBar"

class SideBar extends Component {
    render() {
        const { kind, ...otherProps } = this.props;

        if (kind === 'left') {
            return (
                <LeftSideBar {...otherProps} />
            );
        }
    }
}

export default SideBar;