import React, { Component } from 'react'
import './App.css'
import Web3 from 'web3'
import Tx from 'ethereumjs-tx'
// import Countdown from 'react-countdown-now'


class App extends Component {
    constructor(props) {
        super(props)

            // AdamCrowdSale.sol
            // this.contractAddress = "0xac94929a467571565f2dcbc5bc09eb959224931f",
            // this.abi = [{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"displayOwnership","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}],

            // AdamCoinCrowdSale.sol
            this.contractAddress = '0x179b0ef8f4d9d96a03d8d49fd0d1fa322626ea0d';
            this.abi = [{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"displayOwnership","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];

            this.state = {
                totalSupply: '',
                buyingCoins: false,
                crowdSale: false,
                EVMAccounts: []
            }

        // Connection to Ropsten Ethereum Network
        //this.web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io'));
        //this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
        this.web3 = new Web3(new Web3.providers.HttpProvider('http://development.etherealize.io:8546'))

        // Contract Object
        this.AdamCoinsContract = new this.web3.eth.Contract(this.abi, this.contractAddress)

        // Get EVM Accounts
        this.getEVMAccounts()

        // Get Balance of EVM Account
        // this.getAccountBalance()
    }


    componentDidMount() {
        this.eventWatcher()
    }

    //https://medium.com/@theMadKing/watching-solidity-events-the-right-way-d3d0a30bdc4d
    // make this work....



    // Handle Button Clicks
    handleButtonClick(type, event) {
        console.log('Clicked Type: '+type)

        switch(type) {
            case "totalSupply":
                console.log('Total Supply Data...')

                const thisState = this
                this.AdamCoinsContract.methods.displayOwnership().call()
                    .then(function (ownerAddress) {
                        console.log(ownerAddress);    // 'hello world’

                        thisState.setState({
                            totalSupply: ownerAddress
                        })

                        return null

                    })

                break;
            case "triggerEvent":
                console.log('Trigger Event with Watcher...')
                this.AdamCoinsContract.methods.transferOwnership("0xe723cfe87766398f7c7d378c56b1aa3f3007f321").call()
                    .then(function (data) {
                        console.log('nothing return on the Contract Function Call...'+data);
                        console.dir(data);
                        return null
                    })
                break;
            case "buyLoveCoins":
                this.buyLoveCoinsNow()
                break;
            case "crowdSale":
                this.crowdSale()
                break;
            default:
                break;
        }
    }


    // Function to listen to a Contract Event
    eventWatcher() {
        console.log('Started Event Listener....');

        var sender
        var symbol
        var supply
        var name
        var uiInfo

        //var depositEvent = this.AdamCoinsContract.TokenInfo({_sender: sender, _symbol: symbol, _supply: supply, _name: name, _uiInfo: uiInfo
        //});
    }


    // Get EVM Accounts
    getEVMAccounts() {
        var accounts;
        var defaultAccount;
        var ComponentThis = this;

        this.web3.eth.getAccounts(function(error, response){
            // this will wait for the response asynchronously
            if(!error) { // error == 0, so let's process the response
                console.log(response); // print it
                accounts = response;  // remember it
                defaultAccount = accounts[0]; // do something with it

                ComponentThis.setState({
                    EVMAccounts: accounts
                })

            } else {
                console.error(error); // there was an error, so let's see it.
            }
        }) // notice how } marks the end of the function we passed IN to web3.personal.listAccounts() and ) marks the end of the request.
    }


    // // Get Balance of EVM Account
    // getAccountBalance() {
    //     this.AdamCoinsContract.methods.balanceOf("0xe723cfe87766398f7c7d378c56b1aa3f3007f321").call()
    //         .then(function (data) {
    //             console.log('BalaneOf Return...'+data);
    //             console.dir(data);
    //             return null
    //         })
    // }


    // Buy Love Coins Now
    buyLoveCoinsNow() {
        console.log('buy love coins now...')

        this.setState({
            buyingCoins: true
        })
    }


    // Crowd Sale
    crowdSale() {
        console.log('show crowdsale information...')

        this.setState({
            crowdSale: true
        })
    }


    render() {

        console.dir(this.web3)

        console.log(this.web3.eth.accounts)
        console.log(this.web3.eth.defaultBlock)
        console.log(this.web3.eth.blockNumber)
        console.dir(this.web3.eth)
        console.dir(this.web3.eth.currentProvider.host)
        console.dir(this.web3.eth.defaultAccount)
        console.dir(this.web3.eth.accounts.wallet.defaultKeyName)
        console.dir(this.web3.eth)
        console.log(this.web3.eth.getHashrate())
        console.dir(this.web3.eth.hashrate)
        console.dir(this.web3.eth.getGasPrice())
        console.dir(this.web3.eth)
        console.log(this.web3.eth.getBlock("50").timestamp)
        console.dir(this.web3.eth)
        console.dir(this.web3.eth)

        console.log('EVMAccounts: '+this.state.EVMAccounts)




        // Using the known abi of our contract, inject it into the contract object
        const ETRContract = new this.web3.eth.Contract(this.abi, this.contractAddress);
        ETRContract.methods.displayOwnership().call()
            .then(console.log);


        // This doesn't work as the info isn't in the local JSON... Need to Query Server with Promise...
        //console.log(this.web3.eth.balanceOf('0xe47c4befB25055860fd026e96885B30C7a244b30'))
        // ETRContract.methods.balanceOf('0xe47c4befB25055860fd026e96885B30C7a244b30').call()
        //     .then(console.log);



        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Love Coins Crowd Funding...</h1>
                    <h1 className="App-title">Etherealize Application...</h1>
                    <h4>EVM Host: {this.web3.eth.currentProvider.host}</h4>
                    <h4>Current Block Number: {this.web3.eth.blockNumber}</h4>
                    <h4>Wallet Key Name: {this.web3.eth.accounts.wallet.defaultKeyName}</h4>

                    <h4>
                        EVM Accounts:
                        {this.state.EVMAccounts.map((itemTestArray) => (<li key={itemTestArray}> {itemTestArray} </li>))}
                    </h4>

                    <br/>
                    {/*<div>*/}
                        {/*CrowdSale begins in:*/}
                        {/*<Countdown date={Date.now() + 1000000000} />*/}
                    {/*</div>*/}


                </header>

                <button
                    onClick={this.handleButtonClick.bind(this, 'totalSupply')}
                >Get Contract Owner Address... {this.state.totalSupply}</button><br/>

                <button
                    onClick={this.handleButtonClick.bind(this, 'triggerEvent')}
                >Transfer Ownership to Address... {this.state.triggerEvent}</button><br/>

                <button
                    onClick={this.handleButtonClick.bind(this, 'buyLoveCoins')}
                >
                    Click here to Buy into Love Coins ICO...
                </button>

                {this.state.buyingCoins &&
                    <div>
                        <h1>Join Now</h1><br/>
                        <table>
                            <tbody>
                                <tr>
                                    <td><h3>Username</h3></td>
                                    <td><input type="text"/></td>
                                </tr>
                                <tr>
                                    <td><h3>Password</h3></td>
                                    <td><input type="text"/></td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <button
                                            onClick={this.handleButtonClick.bind(this, 'crowdSale')}
                                        >
                                            JOIN NOW!!
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                }

                {this.state.crowdSale &&
                    <div>
                        <h1>Crowd Sale Specifics from Contract...</h1>
                        <table>
                            <tbody>
                            <tr>
                                <td><h3>Start Date/Time</h3></td>
                                <td>..........</td>
                            </tr>
                            <tr>
                                <td><h3>End Date/Time</h3></td>
                                <td>..........</td>
                            </tr>
                            <tr>
                                <td><h3>Purchasing Number of Coins</h3></td>
                                <td>..........</td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <button
                                        onClick={this.handleButtonClick.bind(this, 'crowdSale')}
                                    >
                                        BUY NOW!!
                                    </button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                }

            </div>
        )
    }
}

export default App;
