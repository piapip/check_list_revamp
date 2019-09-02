pragma solidity ^0.5.8;

import "./4_IdeaHelper.sol";

// EVERY ACTION NEEDS A COST TO PAY THE TRUE OWNER

contract GetInfo is IdeaHelper{

  function getIdeaInfo(uint _listId, uint _ideaId) external view onlyOwner(_listId) returns (string memory, bool, bool, uint, uint, address){
    // Idea memory temp = listIdea[_listId][_ideaId];
    // doing this way will cost us less moeny though the code is kinda ugly
    return (listIdea[_listId][_ideaId].name,  listIdea[_listId][_ideaId].finish,
            listIdea[_listId][_ideaId].close, listIdea[_listId][_ideaId].rank,
            listIdea[_listId][_ideaId].depth, listIdea[_listId][_ideaId].finisher);}

  function getListByOwner(address _owner) external view returns(uint[] memory){
    uint[] memory list = new uint[](ownerListCount[_owner]);
    uint counter = 0;
    for(uint i = 0; i < listIdeaCount; i++) {
      if(isOwner(i)){
        list[counter] = i;
        counter++;
      }
    }
    return list;}

  function getListInfo(uint _listId) external view onlyOwner(_listId) returns(uint, address[] memory, string memory) {
    return (listIdeaSize[_listId], listToOwner[_listId], listToLog[_listId]);}

  function getOwnerName(address _owner, address _friend) external view returns(bytes memory) {
    return nicknameList[_owner][_friend];}
}