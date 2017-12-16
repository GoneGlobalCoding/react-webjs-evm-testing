var HDWalletProvider = require("truffle-hdwallet-provider");

var infura_apikey = 'aipuyFOvpeuYLKsG8Zty';
var mnemonic = 'copy coin suggest sorry index equal obscure car across wealth garage drink';

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*"
    },
    ropsten: {
      provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/"+infura_apikey),
      network_id: 3,
      gas: 4612388,
      gasPrice: 2776297000
    },
    etherealize: {
        network_id: 3,
        gas: 4612388,
        gasPrice: 2776297000
    }
  }
}
