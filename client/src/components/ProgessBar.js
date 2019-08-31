import React, { Component } from 'react';

import { Progress } from 'reactstrap';

class ProgressBar extends Component {
  render() {
    // console.log(typeof this.props.unfinished[0])
    let total = this.props.finished + this.props.unfinished
    const showProgress = 
    (total === 0) ? (
      <Progress value = {0} />
    ) : (
      <Progress color = {this.props.color} value = {100*this.props.finished/total} />
    )
    return (
      <div>
        {showProgress}
      </div>
    );
  }
}

export default ProgressBar;