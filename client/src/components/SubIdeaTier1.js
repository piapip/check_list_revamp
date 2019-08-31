import React, { Component } from 'react';

import { CardText } from 'reactstrap';

class SubIdeaTier1 extends Component {

  finish = () => {
    this.props.finish(this.props.listId, this.props.list[0].ideaId)
  }

  unfinish = () => {
    this.props.unfinish(this.props.listId, this.props.list[0].ideaId)
  }

  render() {
    const showName =
      (this.props.list[0].finished) ? (
        <div className="custom-control custom-checkbox">
          <input type="checkbox" className="custom-control-input"
            id={`defaultSubIdeaTier1Checked${this.props.list[0].rank + "." + this.props.list[0].depth}`} onChange={this.unfinish} checked />
          <label className="custom-control-label" htmlFor={`defaultSubIdeaTier1Checked${this.props.list[0].rank + "." + this.props.list[0].depth}`}>
            <CardText>{this.props.list[0].name}</CardText>
          </label>
        </div>
      ) : (
          <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input"
              id={`defaultSubIdeaTier1Unchecked${this.props.list[0].rank + "." + this.props.list[0].depth}`} onChange={this.finish} />
            <label className="custom-control-label" htmlFor={`defaultSubIdeaTier1Unchecked${this.props.list[0].rank + "." + this.props.list[0].depth}`}>
              <CardText>{this.props.list[0].name}</CardText>
            </label>
          </div>
        )

    return (
      <div>
        {showName}
      </div>
    );
  }
}

export default SubIdeaTier1;