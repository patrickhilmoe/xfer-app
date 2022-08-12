import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import Home from './Home/Home';

class ModalForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <div>
                <Button color="danger" onClick={this.toggle}>Take Picture</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal fade">
                    <ModalHeader toggle={this.toggle}>Taking picture</ModalHeader>
                    <Home />
                    <ModalBody>
                        alsdfjlkasjf jaslfkasaslfjlasls  lsdakfjlasdjalsas butts
                    </ModalBody>
                    <ModalFooter toggle={this.toggle}>
                        <Button color="primary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default ModalForm;