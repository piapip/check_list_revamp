import React, { Component } from 'react';
import { Card, CardBody, CardText } from 'reactstrap';

class SubIdeaTier2 extends Component {
  finish = (event) => {
    this.props.finish(this.props.listId, event.target.value)
  }

  unfinish = (event) => {
    this.props.unfinish(this.props.listId, event.target.value)
  }

  render() {
    const printSubIdeasTier2 =
      (this.props.list.length > 1) ? (
        this.props.list.map((idea) => {
          console.log(idea)
          return (idea.depth !== '0') ? (
            (idea.finished) ? (
              <div key={idea.rank + "." + idea.depth + "." + idea.name} className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" value={idea.ideaId}
                    id={`defaultSubIdeaTier2Checked${idea.rank + "." + idea.depth}`} onChange={this.unfinish} checked />
                  <label className="custom-control-label" htmlFor={`defaultSubIdeaTier2Checked${idea.rank + "." + idea.depth}`}>
                    <CardText>{idea.name}</CardText>
                  </label>
                
              </div>
            ) : (
                <div key={idea.rank + "." + idea.depth + "." + idea.name} className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" value={idea.ideaId}
                    id={`defaultSubIdeaTier2Unchecked${idea.rank + "." + idea.depth}`} onChange={this.finish} />
                  <label className="custom-control-label" htmlFor={`defaultSubIdeaTier2Unchecked${idea.rank + "." + idea.depth}`}>
                    <CardText>{idea.name}</CardText>
                  </label>
                </div>
              )
          ) : "";
        })) : "";
    return (
      <Card>
        <CardBody>
          {printSubIdeasTier2}

          <div className="float-right">
          </div>
        </CardBody>
      </Card >
    );
  }
}

export default SubIdeaTier2;