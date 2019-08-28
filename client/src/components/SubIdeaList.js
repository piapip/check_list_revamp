import React, { Component } from 'react';
import { Card, CardBody, UncontrolledCollapse, Button } from 'reactstrap';

import SubIdeaTier1 from './SubIdeaTier1'
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
          return (
            <Card key={list[0].rank + "." + list[0].depth}>
              <CardBody>
                <SubIdeaTier1
                  list={list} />
                <Button id={"togglerSubIdea" + list[0].rank + list[0].depth} outline>Show detail</Button>
                <UncontrolledCollapse toggler={"togglerSubIdea" + list[0].rank + list[0].depth}>
                  <Card>
                    <CardBody>
                      <SubIdeaQuery
                        listId={this.props.listId}
                        rank={list[0].rank}
                        depth={this.props.rankMaxDepth[list[0].rank]}
                        addNewIdea={this.addIdeaLowerTier}
                        option="Add more details  " />
                      <SubIdeaTier2
                        list={list} />
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