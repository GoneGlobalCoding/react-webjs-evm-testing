var AdamCoins = artifacts.require("./AdamCoins.sol");

module.exports = function(deployer) {
  deployer.deploy(AdamCoins);
};
