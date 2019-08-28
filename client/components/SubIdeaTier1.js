import React, { Component } from 'react';

import { CardText } from 'reactstrap';

class SubIdeaTier1 extends Component {
  render() {
    // console.log(this.props.list)
    return (
      <div>
        <CardText>{this.props.list[0].name}</CardText>
      </div>
    );
  }
}

export default SubIdeaTier1;