import React from 'react';

import ReactSplitPane from 'react-split-pane';

class UgeneSplitPane extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        // Filter out extra props that are specific to this HOC and shouldn't be
        // passed through
        const { children, ...passThroughProps } = this.props;

        // Inject props into the wrapped component. These are usually state values or
        // instance methods.
        const injectedProp = "injectedProp";

        const divStyle = {
            /*height: (this.state._hei - 48) + 'px',*/
            /*padding: 0 + 'px', ZZZ*/
        };

        if( typeof children === 'undefined' || children === null ){
            return (
                <ReactSplitPane {...passThroughProps}>
                    <div/> <div/>
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