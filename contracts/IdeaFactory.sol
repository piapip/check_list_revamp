pragma solidity ^0.5.8;

contract IdeaFactory {

  struct Idea {
    string name;
    bool finish;
    bool close;
    // I was trying to create pointer but it seems like I can get
    // away without it due to the nature of Blockchain.
    uint rank;
    uint depth;
    address finisher;
    // List 0  0 - 1 - 2 - 3 - 4  ---(rank 0, 1, 2,...)
    //             1   1   1      |||(depth)
    //                 2          <- it doesn't work like this anymore
    // multiple ideas can coexist in a same depth of a rank.
    // So idea 0 will have multiple ideas 0.x at the rank 0 depth 1.
    // But idea 0.1 couldn't have many 0.1.x at rank 0 depth 2
    // because there's no way to disguish subidea of idea 0.1 from subidea of idea 0.2.
    // Actually, this is a great idea lolz, so we can protect the genuine of the idea true owner.
    // He/she will be the only one who knows the true orders of those subidea.
    // Which mean I should have given the list a name, huh...
    // which mean one more mappings.
    // The idea is right but nah, it needs more indepth settings.
  }

  mapping (uint => Idea[]) listIdea;
  uint listIdeaCount;
  mapping (uint => uint) listIdeaSize;
  mapping (uint => address[]) listToOwner;
  mapping (uint => uint) listOwnerCount;
  mapping (address => uint) ownerListCount;
  mapping (uint => string) listToLog;

  function addNewIdea(string calldata _name) external {
    listIdea[listIdeaCount].push(Idea(_name, false, false, listIdeaCount, 0, address(0)));
    listIdeaSize[listIdeaCount] = 1;
    listToOwner[listIdeaCount].push(msg.sender);
    listOwnerCount[listIdeaCount] = 1;
    ownerListCount[msg.sender]++;
    listIdeaCount++;}
}

// Seems like the more I reupload those contracts to Blockchain, the more money it costs.