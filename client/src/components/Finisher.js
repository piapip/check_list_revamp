import React, { Component } from 'react';

import { Button } from 'reactstrap'

class Finisher extends Component {
  render() {
    const showName = 
    (this.props.name) ? (
        <Button>{this.props.name}</Button>
    ) : ""
    return (
      <div>
        {showName}
      </div>
      
    );
  }
}

export default Finisher;