import React from 'react';

import ReactSplitPane from 'react-split-pane';

class UgeneSplitPane extends React.Component {

    render() {
        // Filter out extra props that are specific to this HOC and shouldn't be
        // passed through
        const { children, ...passThroughProps } = this.props;

        if( typeof children === 'undefined' || children === null ){
            return (
                <ReactSplitPane {...passThroughProps}>
                    <div> </div>
                    <div> </div>
                </ReactSplitPane>
            );
        } else {
            return (
                <ReactSplitPane {...passThroughProps}>
                    {children}
                </ReactSplitPane>
            );
        }
    }
}

export default UgeneSplitPane;