import React, { Component } from 'react';

import { Card, CardBody, CardText } from 'reactstrap';

class SubIdeaTier2 extends Component {
  render() {
    let count = -1
    const printSubIdeasTier2 =
      (this.props.list.length > 1) ? (
        this.props.list.map((idea) => {
          count++;
          return (count !== 0) ? (
            <CardText key={"IdeaTier2" + idea.rank + "." + idea.depth}>
              {idea.name}
            </CardText>
          ) : "";
        })
      ) : "";
    return (
      <Card>
        <CardBody>
          {printSubIdeasTier2}
        </CardBody>
      </Card>
    );
  }
}

export default SubIdeaTier2;