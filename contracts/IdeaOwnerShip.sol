pragma solidity ^0.5.8;

import "./IdeaFactory.sol";

contract IdeaOwnerShip is IdeaFactory {

  mapping(address => mapping(address => bytes)) nicknameList;

  function writeLog(uint _listId, bytes memory _action, bytes memory _target) internal {
    address originalOwner = listToOwner[_listId][0];
    bytes memory doer;
    if(isTrueOwner(_listId)) doer = "Boss";
    else doer = nicknameList[originalOwner][msg.sender];
    bytes memory log = abi.encodePacked("'", doer, "'", _action, "'", _target, "'.");
    listToLog[_listId] = string(abi.encodePacked(listToLog[_listId], log));
    // listToLog[_listId] = string(abi.encodePacked(listToLog[_listId], abi.encodePacked("'", doer, "' ", _action, "'", _target, "'.")));
    bytes(listToLog[_listId]).push("\n");}

  function isOwner(uint _listId) internal view returns(bool) {
    for(uint i = 0; i < listOwnerCount[_listId]; i++) {
      if(msg.sender == listToOwner[_listId][i]) return true;
    }
    return false;}

  function isTrueOwner(uint _listId) internal view returns(bool) {
    return msg.sender == listToOwner[_listId][0];}

  modifier onlyOwner(uint _listId) {
    require(isOwner(_listId),"Not yours");
    _;}

  modifier onlyTrueOwner(uint _listId) {
    require(isTrueOwner(_listId), "You didn't create it");
    _;}

  function shareOwnerShip(address _friendAddress, bytes calldata _name, uint _listId) external onlyTrueOwner(_listId) {
    nicknameList[msg.sender][_friendAddress] = bytes(_name);
    listToOwner[_listId].push(_friendAddress);
    listOwnerCount[_listId]++;
    ownerListCount[_friendAddress]++;
    writeLog(_listId, " has granted permission to ", _name);}

  // Sadly, I have to admit that Blockchain doesn't support convenient event logging because how it handles strings
  // It might be possible in future since the dev's team is working on it I suppose.
  // But for now, we have to sit there and pray for the best.
  // The way I code below there, it works but it costs hella much.
}