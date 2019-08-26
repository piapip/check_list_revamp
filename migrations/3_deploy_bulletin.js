var GetInfo = artifacts.require("../contracts/GetInfo.sol");

module.exports = async(deployer) => {
    await deployer.deploy(GetInfo);
};
