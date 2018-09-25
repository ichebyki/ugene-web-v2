import React from 'react';

import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';

class UgeneScrollPane extends React.Component {

    render() {
        // Filter out extra props that are specific to this HOC and shouldn't be
        // passed through
        const { children, ...passThroughProps } = this.props;

        return (
            <PerfectScrollbar {...passThroughProps}>
                {children}
            </PerfectScrollbar>
        );
    }
}

export default UgeneScrollPane;