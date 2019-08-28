import React, { Component } from 'react';
import { Card, CardBody, CardText, Form, Button, Input } from 'reactstrap';

class NewIdeaQuery extends Component {
  state = {
    ideaName: ''
  }

  inputType = (event) => {
    this.setState({ ideaName: event.target.value })
  }

  addIdea = () => {
    if (this.state.ideaName || this.state.ideaName !== '')
      this.props.addNewIdea(this.state.ideaName)
  }

  render() {
    return (
      <div>
        <Card>
          <Form>
            <CardBody>
              <CardText><Input onChange={this.inputType} placeholder="Idea description" /></CardText>
              <Button onClick={this.addIdea}> {this.props.option}</Button>
            </CardBody>
          </Form>
        </Card>
      </div>
    );
  }
}

export default NewIdeaQuery;