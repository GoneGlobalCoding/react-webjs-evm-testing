var gasLimit = web3.eth.getBlock('latest').gasLimit;
console.log(gasLimit);
/**
 * Define the contract interface (get from ABI compilation of solcjs)
 */
var test = web3.eth.contract([{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"displayOwnership","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);


test.eth.estimateGas({
    data: '0x6060604052341561000f57600080fd5b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061028e8061005e6000396000f300606060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680638da5cb5b1461005c578063a0c0ca58146100b1578063f2fde38b14610106575b600080fd5b341561006757600080fd5b61006f61013f565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156100bc57600080fd5b6100c4610164565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561011157600080fd5b61013d600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061018d565b005b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156101e857600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151561025f57806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b505600a165627a7a72305820cd66cf4a98b65a8a8d892026e61fc95a33304fc972cf1cd93fa3eccd881665710029',
    // arguments: [startTime, endTime, rate, fundWallet, tokenAddress]
},function(err, gas){
    console.log("Error" + err);
    console.log("Gas estimation" + gas);
});

/**
 * Create a new contract instance
 * 1. Pass in the constructor variables
 * 2. Pass in the transaction object to deploy (with a data field that is the solcjs bin output BUT with a preceeding 0x within the string)
 * 3. Pass in a call back function that takes in (error,contract) parameters to help track success/failure of your contract.
 */
var contractInstance = test.new(
// startTime, endTime, rate, fundWallet, tokenAddress,
    {
        from: "0xe47c4befb25055860fd026e96885b30c7a244b30",//or can use this: web3.eth.accounts[0],
        data: '0x6060604052341561000f57600080fd5b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061028e8061005e6000396000f300606060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680638da5cb5b1461005c578063a0c0ca58146100b1578063f2fde38b14610106575b600080fd5b341561006757600080fd5b61006f61013f565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156100bc57600080fd5b6100c4610164565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561011157600080fd5b61013d600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061018d565b005b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156101e857600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151561025f57806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b505600a165627a7a72305820cd66cf4a98b65a8a8d892026e61fc95a33304fc972cf1cd93fa3eccd881665710029',
        gas: '3000000'
    }, function (e, contract) {
        console.log(e,contract);
        if (typeof contract.address !== 'undefined') {
            console.log('Contracted mine! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
        }
    });