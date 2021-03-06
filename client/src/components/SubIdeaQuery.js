import React, { Component } from 'react';
import { Card, CardBody, CardText, Form, Button, Input } from 'reactstrap';

class SubIdeaQuery extends Component {
  state = {
    ideaName: ''
  }

  inputType = (event) => {
    this.setState({ ideaName: event.target.value })
  }

  addIdea = () => {
    if (this.state.ideaName || this.state.ideaName !== '')
      this.props.addNewIdea(this.props.listId, this.state.ideaName, this.props.rank, this.props.depth)
  }

  render() {
    const showQuery =
      (this.props.condition) ? (
        <Card>
          <Form>
            <CardBody>
              <CardText><Input onChange={this.inputType} placeholder="Idea description" /></CardText>
              <Button onClick={this.addIdea}> {this.props.option}</Button>
            </CardBody>
          </Form>
        </Card>
      ) : "";
    return (
      <div>
        {showQuery}
      </div>
    );
  }
}

export default SubIdeaQuery;