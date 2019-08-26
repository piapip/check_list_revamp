pragma solidity ^0.5.8;

import "./IdeaHelper.sol";

contract GetInfo is IdeaHelper{

  function getIdeaInfo(uint _listId, uint _ideaId) external view onlyOwner(_listId) returns (string memory, bool, bool, uint, uint, address){
    // Idea memory temp = listIdea[_listId][_ideaId];
    // doing this way will cost us less moeny though the code is kinda ugly
    return (listIdea[_listId][_ideaId].name,  listIdea[_listId][_ideaId].finish,
            listIdea[_listId][_ideaId].close, listIdea[_listId][_ideaId].rank,
            listIdea[_listId][_ideaId].depth, listIdea[_listId][_ideaId].finisher);}

  function getLogByList(uint _listId) external view onlyOwner(_listId) returns(string memory) {
    return listToLog[_listId];}

  function getListByOwner(address _owner) external view returns(uint[] memory, uint[] memory){
    uint[] memory list = new uint[](ownerListCount[_owner]);
    uint[] memory listSize = new uint[](ownerListCount[_owner]);
    uint counter = 0;
    for(uint i = 0; i < listIdeaCount; i++) {
      if(isOwner(i)){
        list[counter] = i;
        listSize[counter] = listIdeaSize[i];
        counter++;
      }
    }
    return (list, listSize);}
}