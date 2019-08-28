pragma solidity ^0.5.8;

import "./3_ListIdeaHelper.sol";

contract IdeaHelper is ListIdeaHelper{
  function finish(uint _listId, uint _ideaId) external onlyOwner(_listId){
    listIdea[_listId][_ideaId].finish = true;
    listIdea[_listId][_ideaId].finisher = msg.sender;
    writeLog(_listId, " has finished ", (bytes)(listIdea[_listId][_ideaId].name));}

  function unfinish(uint _listId, uint _ideaId) external onlyOwner(_listId){
    listIdea[_listId][_ideaId].finish = false;
    listIdea[_listId][_ideaId].finisher = address(0);
    writeLog(_listId, " has unfinished ", (bytes)(listIdea[_listId][_ideaId].name));}

  function closeIdea(uint _listId, uint _ideaId) external onlyTrueOwner(_listId){
    listIdea[_listId][_ideaId].close = true;
    writeLog(_listId, " has closed ", (bytes)(listIdea[_listId][_ideaId].name));}

  function openIdea(uint _listId, uint _ideaId) external onlyFinisher(_listId, _ideaId) onlyTrueOwner(_listId){
    listIdea[_listId][_ideaId].close = false;
    writeLog(_listId, " has opened ", (bytes)(listIdea[_listId][_ideaId].name));}

  function changeName(uint _listId, uint _ideaId, string calldata _newName) external onlyOwner(_listId){
    listIdea[_listId][_ideaId].name = _newName;
    writeLog(_listId, " has added ", (bytes)(_newName));}
}