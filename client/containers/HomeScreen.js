import React, { Component } from 'react';
import Web3 from 'web3';

import Footer from '../components/Footer';
import IdeaQuery from '../components/NewIdeaQuery';
import MainIdeaList from '../components/MainIdeaList';

class HomeScreen extends Component {

  addNewIdea = (name) => {
    this.props.myContract.methods.addNewIdea(name).send({ from: this.props.account })
  }

  grantPermission = (newOwner, newOwnerName, listId) => {
    this.props.myContract.methods.shareOwnerShip(newOwner, Web3.utils.fromAscii(newOwnerName), listId).send({ from: this.props.account })
  }

  render() {
    return (
      <div>
        <IdeaQuery
          addNewIdea={this.addNewIdea}
          option="Create a new Idea" />
        <MainIdeaList
          account={this.props.account}
          myContract={this.props.myContract}
          myIdeas={this.props.myIdeas}
          grantPermission={this.grantPermission} />
        <Footer
          account={this.props.account}
          balance={this.props.balance} />
      </div>
    );
  }
}

export default HomeScreen;