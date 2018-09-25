import React from 'react';
import {Route} from "react-router-dom";

import PropTypes from 'prop-types';

import ScrollPane from '../ScrollPane';
import SplitPane from '../SplitPane';

class UgeneWorkflow extends React.Component {

    render() {
        return (
            <SplitPane split="horizontal" minSize={0} defaultSize={'75%'} primary="first">
                <SplitPane split="vertical" minSize={0} defaultSize={200} primary="first">
                    <ScrollPane>
                        element pane
                    </ScrollPane>
                    <SplitPane split="vertical" minSize={0} defaultSize={200} primary="second">
                        <ScrollPane>
                            diagram pane
                        </ScrollPane>
                        <ScrollPane>
                            properies pane
                        </ScrollPane>
                    </SplitPane>
                </SplitPane>
                <ScrollPane>
                    logging pane
                </ScrollPane>
            </SplitPane>
        );
    }
}

export default UgeneWorkflow;