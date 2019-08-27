import React, { Component } from "react";
import Web3 from 'web3';
import { BrowserRouter, Route } from 'react-router-dom';

import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import IdeaContract from "./contracts/GetInfo.json";
import HomeScreen from "./containers/HomeScreen";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      balance: '',
      myContract: [],
      myIdeas: []
    }
  }

  componentDidMount = async () => {
    window.ethereum.autoRefreshOnNetworkChange = false; //might need to disable this one later
    await window.ethereum.enable();
    const web3 = await new Web3(Web3.givenProvider);
    let account = await web3.eth.getCoinbase();
    this.setState({ account })
    let balance = web3.utils.fromWei(await web3.eth.getBalance(account))
    this.setState({ balance })
    let networkId = await web3.eth.net.getId();
    let myContract = new web3.eth.Contract(IdeaContract.abi, IdeaContract.networks[networkId].address)
    await this.setState({ myContract });
    this.getIdeasInfo()
  }

  getIdeasInfo = async () => {

    let listIds = await this.state.myContract.methods.getListByOwner(this.state.account).call({ from: this.state.account });

    let myIdeas = [];
    for (let listId of listIds) {
      let listInfo = await this.state.myContract.methods.getListInfo(listId).call({ from: this.state.account });
      let idea = { id: '', info: [], log: '', maxRank: 0, rankMaxDepth: [], ideaCount: 0 };
      idea.id = listId
      idea.ideaCount = listInfo[0];
      for (let ideaId = 0; ideaId < idea.ideaCount; ideaId++) {
        let info = await this.state.myContract.methods.getIdeaInfo(listId, ideaId).call({ from: this.state.account });
        if (!idea.maxRank || idea.maxRank < info[3]) idea.maxRank = info[3]
        if (!idea.rankMaxDepth[info[3]] || idea.rankMaxDepth[info[3]] < info[4]) idea.rankMaxDepth[info[3]] = info[4];
        idea.info.push(info);
      }
      

      // FIX THIS THING, AND ALSO THE getOwnerName in GetInfo.sol, it needs 2 parameters instead of 1. 
      // And the piece of code down here. It's just wrong.
      idea.owners = [];
      console.log(listInfo[1])
      for (let owner of listInfo[1]) {
        let ownerName;
        if (owner.toLowerCase() === this.state.account) ownerName = "Boss"
        else ownerName = await this.state.myContract.methods.getOwnerName(owner).call({ from: this.state.account })
        if (ownerName && ownerName !== "Boss") ownerName = Web3.utils.toAscii(ownerName);
        idea.owners.push(ownerName)
      }

      idea.log = listInfo[2].split('\n');
      idea.log.pop();
      myIdeas.push(idea);
    }

    this.setState({ myIdeas });
  }

  render() {
    //I can't stress this enough how crucial this little shit is
    //Without the () ?, this piece of code will get fucked because the addNewIdea in this.addIDea
    //Yeah, it's a whole damn different thing to what we suppose it should be. Because how sync and async works
    //They are double-edge swords, handy but vulnerable to stupid shit.
    // const drawButton =
    //   (this.state.myContract) ? (
    //     <div>
    //       <button onClick={this.addIdea}>Add Idea</button>
    //       <button onClick={this.addIdeaSameTier}>Add idea same tier</button>
    //       <button onClick={this.addIdeaLowerTier}>Add idea lower tier</button>
    //     </div>
    //   ) : "";

    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path='/'
            render={(...props) => {
              return (
                <HomeScreen
                  account={this.state.account}
                  balance={this.state.balance}
                  myIdeas={this.state.myIdeas}
                  myContract={this.state.myContract} />
              )
            }} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;