import React, { Component } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class Log extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    let count = 0;
    const printLog =
      (this.props.log) ? (
        this.props.log.map((log) => {
          count++;
          return (
            <p key={count}>{log}<br /></p>
          )
        })
      ) : "No action recorded yet";
    return (
      <div>
        <Button onClick={this.toggle}>{this.props.target}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{this.props.header}</ModalHeader>
          <ModalBody>
            {printLog}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Return</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Log;