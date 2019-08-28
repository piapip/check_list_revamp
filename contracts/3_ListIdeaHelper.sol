pragma solidity ^0.5.8;

import "./2_IdeaOwnerShip.sol";

contract ListIdeaHelper is IdeaOwnerShip{
  // LUL it appears so randomly
  // we can have many idea in the same Depth of a certain idea Rank.
  // nevermind, if I need more advises if I want to build versatile multiple dimensional system.
  // For now, addIdeaSameTier can be used multiple times
  // But addIdeaLowerTier can only be used at depth 0 and depth 1.
  // List 0  0 - 1 - 2 - 3 - 4  ---(rank 0, 1, 2,...)
  //             1   1   1      |||(depth)
  //                 2          <- it doesn't work like this anymore
  function addIdeaSameTier(uint _listId, string calldata _ideaName, uint _ideaRank, uint _ideaDepth) external onlyTrueOwner(_listId){
    listIdea[_listId].push(Idea(_ideaName, false, false, _ideaRank+1, _ideaDepth, address(0)));
    listIdeaSize[_listId]++;
    writeLog(_listId, " has added ", bytes(_ideaName));}

  function addIdeaLowerTier(uint _listId, string calldata _ideaName, uint _ideaRank, uint _ideaDepth) external onlyOwner(_listId){
    listIdea[_listId].push(Idea(_ideaName, false, false, _ideaRank, _ideaDepth+1, address(0)));
    listIdeaSize[_listId]++;
    writeLog(_listId, " has added ", bytes(_ideaName));}

  function closeList(uint _listId) external onlyTrueOwner(_listId){
    for(uint i = 0; i < listIdeaSize[_listId]; i++){
      listIdea[_listId][i].close = true;
    }
    writeLog(_listId, " has closed ", "this list.");}

  function openList(uint _listId) external onlyTrueOwner(_listId){
    for(uint i = 0; i < listIdeaSize[_listId]; i++){
      listIdea[_listId][i].close = false;
    }
    writeLog(_listId, " has opened ", "this list.");}
}