import React, { Component } from 'react';
import { Card, CardHeader, CardBody, UncontrolledCollapse, Button, InputGroup, InputGroupAddon } from 'reactstrap';

import ProgressBar from './ProgessBar'
import SubIdeaTier1 from './SubIdeaTier1'
import Finisher from './Finisher'
import SubIdeaTier2 from './SubIdeaTier2'
import SubIdeaQuery from './SubIdeaQuery'

class SubIdeaList extends Component {

  addIdeaLowerTier = (listId, name, ideaRank, ideaDepth) => {
    this.props.myContract.methods.addIdeaLowerTier(listId, name, ideaRank, ideaDepth).send({ from: this.props.account })
  }

  finish = (listId, ideaId) => {
    this.props.myContract.methods.finish(listId, ideaId).send({ from: this.props.account })
  }

  unfinish = (listId, ideaId) => {
    this.props.myContract.methods.unfinish(listId, ideaId).send({ from: this.props.account })
  }

  open = (event) => {
    this.props.open(this.props.listId, event.target.value)
  }

  close = (event) => {
    this.props.close(this.props.listId, event.target.value)
  }

  render() {
    let SubIdeas = []
    this.props.list.info.map((idea) => {
      SubIdeas[idea.rank] = []
      return 0;
    })
    this.props.list.info.map((idea) => {
      SubIdeas[idea.rank].push(idea)
      return 0;
    })
    SubIdeas.shift()
    const printSubIdeas =
      (SubIdeas.length > 0) ? (
        SubIdeas.map((list) => {
          const lockBoardTag =
            (this.props.list.isTrueOwner) ? (
              (list[0].close) ? (
                <InputGroupAddon addonType="append"><Button onClick={this.open} value={list[0].ideaId}>Unlock</Button></InputGroupAddon>
              ) : (
                  <InputGroupAddon addonType="append"><Button onClick={this.close} value={list[0].ideaId}>Lock</Button></InputGroupAddon>
                )
            ) : "";

          return (
            <Card key={list[0].rank + "." + list[0].depth}>
              <CardHeader>
                <ProgressBar
                  color="success"
                  finished={this.props.list.finished[list[0].rank]}
                  unfinished={this.props.list.unfinished[list[0].rank]} />
              </CardHeader>
              <CardBody>
                <div className="float-left">
                  <SubIdeaTier1
                    list={list}
                    listId={this.props.listId}
                    finish={this.finish}
                    unfinish={this.unfinish} />
                </div>
                <div className="float-right">
                  <Finisher
                    name={list[0].finisher} />
                </div>
                <InputGroup>
                  <Button id={"togglerSubIdea" + list[0].rank + list[0].depth} outline>Show detail</Button>
                  {lockBoardTag}
                </InputGroup>
                <UncontrolledCollapse toggler={"togglerSubIdea" + list[0].rank + list[0].depth}>
                  <Card>
                    <CardBody>
                      <SubIdeaQuery
                        listId={this.props.listId}
                        rank={list[0].rank}
                        depth={this.props.rankMaxDepth[list[0].rank]}
                        addNewIdea={this.addIdeaLowerTier}
                        option="Add more details"
                        condition={!list[0].close} />
                      <SubIdeaTier2
                        list={list}
                        listId={this.props.listId}
                        finish={this.finish}
                        unfinish={this.unfinish} />
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
        {printSubIdeas}
      </div>
    );
  }
}

export default SubIdeaList;