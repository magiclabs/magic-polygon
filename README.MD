# Resources
- [GitHub Repo](https://github.com/magiclabs/magic-polygon)
- [Demo](https://magic-polygon.vercel.app/login)

# Quick Start

```
$ git clone https://github.com/magiclabs/magic-polygon.git
$ cd magic-polygon
$ mv .env.local .env // enter your Magic Publishable Key (from https://dashboard.magic.link)
$ yarn install
$ yarn start
```

# Introduction

With the rising gas costs on Ethereum, many developers are looking towards scaling solutions to help with both improved transaction speed, as well as cheaper gas costs for users. Polygon (formerly Matic) is one such solution. 

Polygon is a protocol which enables connecting Ethereum-compatible blockchains, and is also a Proof of Stake side-chain scaling solution for Ethereum. The side-chain runs alongside Ethereum's blockchain, and processes transactions before finalizing them on Ethereum.

With Magic, developers can connect to Polygon by simply specifying the network URL when initiating a Magic instance. This guide will show how you can create a web3-enabled app, allow users to switch between Ethereum and Polygon networks, call smart contracts, and send transactions. 

_Note: `ETH` is the native token to Ethereum, `MATIC` is the native token to Polygon._

# Tutorial

_Note: this app was bootstrapped with the `npx make-magic` React template._

## Connecting to Ethereum / Polgyon

In `magic.js`, we will need two `Magic` and two `Web3` instances, one for each network, since we're allowing users to switch between the two. If you're only interested in connecting to Polygon, then only one instance of `Magic` and `Web3` should be created. We also are adding `magicEthereum.network = "ethereum"` to be able to identify the Magic network we're creating.

You’ll use the same API key for both `Magic` instances so that the user’s public address does not change. 

```js
import { Magic } from 'magic-sdk';
import Web3 from 'web3';

/**
 * Configure Polygon Connection
 */
const polygonNodeOptions = {
  rpcUrl: 'https://rpc-mumbai.matic.today',
  chainId: 80001,
};

export const magicMatic = new Magic(
  process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY,
  { 
    network: polygonNodeOptions, 
  },
);
magicMatic.network = 'matic';

export const maticWeb3 = new Web3(magicMatic.rpcProvider);

// Connect to Ethereum (Goerli Testnet)
export const magicEthereum = new Magic(
  process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY,
  { 
    network: 'goerli', 
  },
);
magicEthereum.network = 'ethereum';

export const ethWeb3 = new Web3(magicEthereum.rpcProvider);

```

## Switching Between Networks

Users are able to switch between the Ethereum and Polygon networks with the `select` element dropdown list. Since one `Magic` instance points towards Ethereum, and the other Polygon, we simply update the instance that we’re using for our app based on whichever network the user selects.

```js
import { magicEthereum, magicMatic, ethWeb3, maticWeb3 } from "../magic";

  const handleChangeNetwork = (e) => {
    e.target.value === 'ethereum' ? setMagic(magicEthereum) : setMagic(magicMatic);
    fetchBalance(userMetadata.publicAddress);
    fetchContractMessage();
  }

  return (
    <div className="info">
      <select name="network" onChange={(e) => handleChangeNetwork(e)}>
        <option value="ethereum">Ethereum (Goerli Testnet)</option>
        <option value="matic">Matic (Mumbai Testnet)</option>
      </select>
    </div>
  )
```

## Viewing User Balance

A user's public address will be the same on both Ethereum and Polygon (as long as you are using the same API key for each instance) so a simple `web3.eth.getBalance` call is all that is needed for either network. Because the native token of Ethereum is `ETH`, and for Polygon is `MATIC`, we're displaying the appropriate token symbol based on the network we're connected to.

```js
const fetchBalance = (address) => {
  web3.eth.getBalance(address).then(bal => setBalance(web3.utils.fromWei(bal)))
}

return (
<h1>Balance</h1>
<div className="info">
  {balance.toString().substring(0, 6)} {magic.network === 'matic' ? 'MATIC' : 'ETH'}
</div>
)
```

## Send Transaction

Sending a transaction is also very simple and the same for either network you're connected to. All that's needed is to provide an amount to send, and  `from` and `to` addresses. If no `gas` or `gasPrice` are explicitly passed in, the gas limit and price will be calculated automatically. Otherwise, the values passed in will be used.

```js
const web3 = magic.network === "ethereum" ? ethWeb3 : maticWeb3;

const sendTransaction = async () => {
  if (!toAddress || !amount) return;
  const receipt = await web3.eth.sendTransaction({
    from: publicAddress,
    to: toAddress,
    value: web3.utils.toWei(amount)
  });
}

return (
 <div className="container">
  <h1>Send Transaction</h1>
  <input 
    type="text" 
    value={toAddress} 
    onChange={(e) => setToAddress(e.target.value)} 
    placeholder="To Address" 
  />
  <input 
    type="text" 
    value={amount} 
    onChange={(e) => setAmount(e.target.value)} 
    placeholder="Amount" 
  />
  <button onClick={sendTransaction}>Send Transaction</button>
</div>
)
```

## Calling Smart Contracts

Separate smart contracts will need to be deployed on each Ethereum and Polygon for your users to interact with them. So you'll also need to dynamically know the correct address that the contract is deployed to in order to call it. 

```js
const network = magic.network === "ethereum" ? 'ethereum' : 'matic';
const goerliContractAddress = '0x8cb46E4bFc14Ce010dFbE5Ecb61BA64d798D3A67';
const maticContractAddress = '0x9ebE0B009146643bb3560375A4562D8d89E135e9';
const contract = new web3.eth.Contract(abi, network === "ethereum" ? goerliContractAddress : maticContractAddress);

// Grabbing `message` variable value stored in the smart contract
const fetchContractMessage = () => contract.methods.message().call().then(setMessage)

// Update contract `message` value on the blockchain
const updateContractMessage = async () => {
  if (!newMessage) return;
  const receipt = await contract.methods.update(newMessage).send({ from: user.publicAddress });
}

return (
  <h1>Contract Message</h1>
  <div className="info">{message}</div>

  <h1>Update Message</h1>
  <input 
    type="text" 
    value={newMessage} 
    onChange={(e) => setNewMessage(e.target.value)} 
    placeholder="New Message" />

  <button onClick={updateContractMessage}>Update</button>
)
```

## Done

That's all there is to it! You've now got an app that allows users to create a wallet with just their email, and connect to multiple networks within your app.
