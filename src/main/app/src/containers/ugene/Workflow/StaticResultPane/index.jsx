import React from 'react';
import ReactDOM from 'react-dom';
import {Route} from "react-router-dom";
import PropTypes from 'prop-types';

import ScrollPane from '../../ScrollPane';
import SplitPane from '../../SplitPane';
import AppPackages from "./AppPackages";
import AppClasses from "./AppClasses";
import AppSource from "./AppSource";
import * as Names from "../../../../constants/Names";
import axios from "axios";
import {Container, Header, Portal, Segment} from "semantic-ui-react";
import AppIssues from "./AppIssues";

class StaticResultPane extends React.Component {

    state = {
        openAlert: false,
        app: this.props.app,

        appPackages: [{key: 0, content: 'Apples'}, {key: 1, content: 'Pears'}, {key: 2, content: 'Oranges'}],
        selectedPackage: '',
        gotPackages: false,

        appClasses: [{key: 0, content: 'Apples'}, {key: 1, content: 'Pears'}, {key: 2, content: 'Oranges'}],
        selectedClass: '',
        gotClasses: false,

        appSource: [],
        selectedLine: 0,
        gotSource: false,

        appIssues: [],
        selectedIssue: 0,
        gotIssues: false,

        pane1HeightDefaultV: '33%', pane2StyleV: '67%',
        pane1WidthDefaultH: '25%', pane2StyleH: '75%',
        pane1WidthDefaultH2: '33%', pane2StyleH2: '67%',
    };

    MessageMap = {};

    openAlert = (m) => this.setState({ openAlert: true, alertMessage: m });
    closeAlert = () => this.setState({ openAlert: false, alertMessage: null });

    constructor(props) {
        super(props);
        this.scrollRef = React.createRef();
    };

    componentDidMount() {
        this.getPakkages(this.state.app);
    }

    onDidMountMessage(i, node) {
        this.MessageMap[i] = ReactDOM.findDOMNode(node);
    }

    onClickPackage(e, d) {
        if (this.state.selectedPackage !== d.content) {
            this.setState({
                              selectedPackage: d.content,
                              selectedClass: null
                          });
            this.getClasses(this.state.app, d.content);
        }
    };

    onClickClass(e, d) {
        if (this.state.selectedClass !== d.content) {
            this.MessageMap = {};
            this.setState({
                              selectedClass: d.content,
                              selectedLine: 0
                          });
            this.getSource(this.state.app,
                           this.state.selectedPackage,
                           d.content);
            this.getIssues(this.state.app,
                           this.state.selectedPackage,
                           d.content);
        }
    };

    onClickIssue(e, d, line) {
        let node = this.MessageMap[line === 0 ? 0 : line - 1];
        if (node) {
            /*window.scrollTo(0, node.scrollTop);*/
            /*window.scrollTo(0, this.scrollRef.current.offsetTop);*/
            this.scrollRef.scrollTop = node.offsetTop - 64;
        }
    };

    getPakkages(app) {
        let headerToken = `Bearer ${localStorage.getItem(Names.JWT_TOKEN)}`;
        let self = this;
        let message = '';

        this.setState({
                          gotPackages: false,
                          appPackages: null,
                          selectedPackage: null,
                          gotClasses: false,
                          appClasses: null,
                          selectedClasses: null
                      });
        axios.post('/auth/apps/static/report/getpakkages',
                   app,
                   { headers: {authorization: headerToken} })
             .then(function (success) {
                 if (success.status === 200) {
                     message = `Started fetching packages: ${success.statusText}`;
                     self.setState({
                                       gotPackages: true,
                                       appPackages: success.data,
                                       selectedPackage: success.data[0],
                     });
                     self.getClasses(self.state.app, success.data[0]);
                 }
                 else {
                     message = "Failed to fetch packages \n"
                               + "status code " + success.status + " \n"
                               + "status text '" + success.statusText + "'";
                     self.openAlert(message);
                 }
             })
             .catch(function (failure) {
                 message = "Failed to fetch packages \n"
                           + "status code " + failure.response.status + " \n"
                           + "status text '" + failure.response.statusText + "'\n"
                           + failure.response.data["message"];
                 self.openAlert(message);
             })
             .then(function () {
                 // always executed
                 console.error(message);
             });
    };

    getClasses(app, pakkage) {
        let headerToken = `Bearer ${localStorage.getItem(Names.JWT_TOKEN)}`;
        let self = this;
        let message = '';

        this.setState({
                          gotClasses: false,
                          appClasses: null,
                          selectedClasses: null
                      });
        axios.post('/auth/apps/static/report/getclasses',
                   {app: app,
                       apppakkage: pakkage,
                       appclass: null,
                       severity: null
                   },
                   { headers: {authorization: headerToken} })
             .then(function (success) {
                 if (success.status === 200) {
                     message = `Started fetching classes: ${success.statusText}`;
                     self.setState({
                                       gotClasses: true,
                                       appClasses: success.data,
                                       selectedClass: success.data[0],
                                   });
                     self.getSource(app, self.state.selectedPackage, success.data[0]);
                     self.getIssues(app, self.state.selectedPackage, success.data[0]);
                 }
                 else {
                     message = "Failed to fetch classes \n"
                               + "status code " + success.status + " \n"
                               + "status text '" + success.statusText + "'";
                     self.openAlert(message);
                 }
             })
             .catch(function (failure) {
                 message = "Failed to fetch classes \n"
                           + "status code " + failure.response.status + " \n"
                           + "status text '" + failure.response.statusText + "'\n"
                           + failure.response.data["message"];
                 self.openAlert(message);
             })
             .then(function () {
                 // always executed
                 console.error(message);
             });
    };

    getSource(app, pakkage, klass) {
        let headerToken = `Bearer ${localStorage.getItem(Names.JWT_TOKEN)}`;
        let self = this;
        let message = '';

        this.setState({
                          gotSource: false,
                          appSource: [],
                          selectedLine: 0
                      });
        axios.post('/auth/apps/static/report/getsource',
                   {app: app,
                       apppakkage: pakkage,
                       appclass: klass,
                       severity: null
                   },
                   { headers: {authorization: headerToken} })
             .then(function (success) {
                 if (success.status === 200) {
                     message = `Started fetching source: ${success.statusText}`;
                     self.setState({
                                       gotSource: true,
                                       appSource: success.data
                                   });
                 }
                 else {
                     message = "Failed to fetch source \n"
                               + "status code " + success.status + " \n"
                               + "status text '" + success.statusText + "'";
                     self.openAlert(message);
                 }
             })
             .catch(function (failure) {
                 message = "Failed to fetch source \n"
                           + "status code " + failure.response.status + " \n"
                           + "status text '" + failure.response.statusText + "'\n"
                           + failure.response.data["message"];
                 self.openAlert(message);
             })
             .then(function () {
                 // always executed
                 console.error(message);
             });
    };

    getIssues(app, pakkage, klass) {
        let headerToken = `Bearer ${localStorage.getItem(Names.JWT_TOKEN)}`;
        let self = this;
        let message = '';

        this.setState({
                          gotIssues: false,
                          appIssues: [],
                          selectedIssue: 0
                      });
        axios.post('/auth/apps/static/report/getissues',
                   {app: app,
                       apppakkage: pakkage,
                       appclass: klass,
                       severity: null
                   },
                   { headers: {authorization: headerToken} })
             .then(function (success) {
                 if (success.status === 200) {
                     message = `Started fetching issues: ${success.statusText}`;
                     self.setState({
                                       gotIssues: true,
                                       appIssues: success.data
                                   });
                 }
                 else {
                     message = "Failed to fetch issues \n"
                               + "status code " + success.status + " \n"
                               + "status text '" + success.statusText + "'";
                     self.openAlert(message);
                 }
             })
             .catch(function (failure) {
                 message = "Failed to fetch issues \n"
                           + "status code " + failure.response.status + " \n"
                           + "status text '" + failure.response.statusText + "'\n"
                           + failure.response.data["message"];
                 self.openAlert(message);
             })
             .then(function () {
                 // always executed
                 console.error(message);
             });
    };

    render() {
        let app = this.state.app;

        if (this.state.openAlert) {
            return this.getAlert();
        }

        return (
            <SplitPane split="horizontal"
                       minSize={20}
                       defaultSize={this.state.pane1HeightDefaultV}
                       primary="first"
                       onDragFinished={ size => {
                           this.setState({splitPos101: size,
                                         pane2StyleV: 'calc(100% - ' + size + 'px)'});
                       }}
                       pane2Style ={{height: this.state.pane2StyleV}}>
                <div style={{height: '100%'}}>
                    <SplitPane split="vertical"
                               minSize={20}
                               defaultSize={this.state.pane1WidthDefaultH}
                               primary="first"
                               style={{height: '100%'}}
                               onDragFinished={ size => {
                                   this.setState({splitPos201: size,
                                                     pane2StyleH: 'calc(100% - ' + size + 'px)'});
                               }}
                               pane2Style ={{width: this.state.pane2StyleH}}>
                        <div style={{height: '100%'}}>
                            <ScrollPane> {this.state.gotPackages
                                          ? <AppPackages packages={this.state.appPackages}
                                                         selected={this.state.selectedPackage}
                                                         onclick={this.onClickPackage.bind(this)}/>
                                          : ''}
                            </ScrollPane>
                        </div>
                        <div style={{height: '100%'}}>
                            <SplitPane split="vertical"
                                       minSize={20}
                                       defaultSize={this.state.pane1WidthDefaultH2}
                                       primary="first"
                                       style={{height: '100%'}}
                                       onDragFinished={ size => {
                                           this.setState({splitPos301: size,
                                                             pane2StyleH2: 'calc(100% - ' + size + 'px)'});
                                       }}
                                       pane2Style ={{width: this.state.pane2StyleH2}}>
                                <div style={{height: '100%'}}>
                                    <ScrollPane> {this.state.gotClasses
                                                  ? <AppClasses classes={this.state.appClasses}
                                                                selected={this.state.selectedClass}
                                                                onclick={this.onClickClass.bind(this)}/>
                                                  : ''}
                                    </ScrollPane>
                                </div>
                                <div style={{height: '100%'}}>
                                    <ScrollPane> {this.state.gotIssues
                                                  ? <AppIssues issues={this.state.appIssues}
                                                               selected={this.state.selectedIssue}
                                                               onclick={this.onClickIssue.bind(this)}/>
                                                  : ''}
                                    </ScrollPane>
                                </div>
                            </SplitPane>
                        </div>
                    </SplitPane>
                </div>
                <div style={{height: '100%'}}>
                    <ScrollPane containerRef={(ref) => this.scrollRef=ref}>
                        <AppSource klass={this.state.selectedClass}
                                   source={this.state.appSource}
                                   issues={this.state.appIssues}
                                   onDidMountMessage={this.onDidMountMessage.bind(this)}/>
                    </ScrollPane>
                </div>
            </SplitPane>
        );
    }

    getAlert() {
        if (this.state.openAlert) {
            let i = 0;
            return <Portal open={true}
                           onOpen={this.openAlert}
                           onClose={this.closeAlert}>
                <Segment padded
                         inverted
                         color='red'
                         style={{width: '50%', left: '25%', right: '25%', position: 'fixed', top: '20%', zIndex: 10000}}>
                    <Header>Message</Header>
                    <Container style={{paddingLeft: '2em'}}>{
                        this.state.alertMessage.split("\n").map(function(item) {
                            i = i + 1;
                            return <div key={"alertMessage-" + i}>
                                {item}
                            </div>;
                        })
                    }</Container>
                </Segment>
            </Portal>
        }
    };

}

export default StaticResultPane;