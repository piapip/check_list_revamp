import React, { Component } from 'react';
import { Card, CardHeader, CardBody, CardText, UncontrolledCollapse, Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';

import ProgressBar from './ProgessBar'
import Log from './Log';
import SubIdeaList from './SubIdeaList';
import SubIdeaQuery from './SubIdeaQuery';

class IdeaList extends Component {

  state = {
    newOwner: '',
    newOwnerName: ''
  }

  inputAddress = (event) => {
    this.setState({ newOwner: event.target.value })
  }

  inputName = (event) => {
    this.setState({ newOwnerName: event.target.value })
  }

  grantPermission = (event) => {
    if (this.state.newOwner || this.state.newOwner !== '' || this.state.newOwnerName || this.state.newOwnerName !== '')
      this.props.grantPermission(this.state.newOwner, this.state.newOwnerName, event.target.value);
  }

  addIdeaSameTier = (listId, name, ideaRank, ideaDepth) => {
    this.props.myContract.methods.addIdeaSameTier(listId, name, ideaRank, ideaDepth).send({ from: this.props.account })
  }

  close = (listId, ideaId) => {
    this.props.myContract.methods.closeIdea(listId, ideaId).send({ from: this.props.account })
  }

  open = (listId, ideaId) => {
    this.props.myContract.methods.openIdea(listId, ideaId).send({ from: this.props.account })
  }

  // 0.0 -> 1.0 -> 1.1, 1.2
  //        2.0 -> 2.1, 2.2

  render() {
    const printMainIdea =
    
      (this.props.myIdeas) ? (
        this.props.myIdeas.map((list) => {
          const ownerTagBoard =
            (list.owners.length === 1) ? (list.owners.length + " owner") : (list.owners.length + " owners");
          return (
            <Card key={list.id}>
              <CardHeader>
                <ProgressBar
                  color="primary"
                  unfinished={list.unfinished[0]}
                  finished={list.finished[0]} />
              </CardHeader>
              <CardBody>
                <div className="clearfix">
                  <CardText className="float-left">{list.info[0].name}</CardText>
                  <div className="float-right" >
                    <Log
                      header="Partner List"
                      target={ownerTagBoard}
                      log={list.owners} />
                  </div>
                </div>
                <Log
                  header={list.info[0].name}
                  target="Event log"
                  log={list.log} />
                <br />
                <InputGroup>
                  <Button id={"togglerMainIdea" + list.id} outline>Show detail</Button>
                  <Input onChange={this.inputAddress} placeholder="Your friend's address" />
                  <Input onChange={this.inputName} placeholder="And your friend's name" />
                  <InputGroupAddon addonType="append"><Button value={list.id} onClick={this.grantPermission}>Grant Permission</Button></InputGroupAddon>
                </InputGroup>
                <UncontrolledCollapse toggler={"togglerMainIdea" + list.id}>
                  <Card>
                    <SubIdeaQuery
                      listId={list.id}
                      rank={list.maxRank}
                      depth={0}
                      addNewIdea={this.addIdeaSameTier}
                      option="Add sub Idea"
                      condition={list.isTrueOwner} />
                    <CardBody>
                      <SubIdeaList
                        listId={list.id}
                        rankMaxDepth={list.rankMaxDepth}
                        list={list}
                        open={this.open}
                        close={this.close}
                        account={this.props.account}
                        myContract={this.props.myContract} />
                    </CardBody>
                  </Card>
                </UncontrolledCollapse>
              </CardBody>
            </Card>
          )
        })
      ) : "";
    return (
      <div>
        {printMainIdea}
      </div>
    );
  }
}
export default IdeaList;