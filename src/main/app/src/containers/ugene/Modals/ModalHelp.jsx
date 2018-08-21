import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Button, Header, Image, Modal } from 'semantic-ui-react'

export default class ModalHelp extends Component {

    static propTypes = {
        open: PropTypes.bool.isRequired,
        dimmer: PropTypes.string.isRequired,
        onclose: PropTypes.func
    };

    state = {
        open: this.props.open,
        dimmer: this.props.dimmer !== 'inverted' && this.props.dimmer !== 'blurring' ? true : this.props.dimmer
        //dimmer: true
        //dimmer: 'inverted'
        //dimmer: 'blurring'
    };

    handleOpen = () => this.setState({ modalOpen: true });

    handleClose = () => this.setState({ modalOpen: false });

    show = dimmer => () => this.setState({ dimmer, open: true });

    close = () => {
        if (this.props.onclose) {
            this.props.onclose();
        }
        this.setState({ open: false })
    };

    render() {
        const { open, dimmer } = this.state;

        return (
            <Modal dimmer={dimmer}
                   closeIcon
                   open={open}
                   closeOnDimmerClick={false}
                   closeOnDocumentClick={false}
                   onClose={this.close}
            >
                <Modal.Header>Help using UGENE</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        <Header>Default Profile Image</Header>
                        <p>We've found the following gravatar image associated with your e-mail address.</p>
                        <p>Is it okay to use this photo?</p>
                        <p>This is an example of expanded content that will cause the modal's dimmer to scroll</p>
                        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        positive
                        icon='checkmark'
                        labelPosition='right'
                        content="Close"
                        onClick={this.close}
                    />
                </Modal.Actions>
            </Modal>
        )
    }
}
