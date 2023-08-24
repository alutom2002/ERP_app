# ERP App using blockchain to storage data

This is an ERP app that the procedure is stored in the blockchain and in the final process the user can scan the QR code to retrieve the data from the blockchain.<br>

## Clone My Repo <br>

```
git clone https://github.com/alutom2002/ERP-app
```

After Cloning, Go to the directory by typing the command shown below.

```
cd ERP-app
```

### Setup hardhat and deploy smartcontract

First cd to hardhat folder and install package

```
cd hardhat
npm install
```

Create `.env` follow the `.example.env` the fill in the information in `.env`
The STAGING_QUICKNODE_KEY is your quicknode HTTP Provider
(QuickNode is a service that provides Ethereum nodes as a service, allowing developers to access the Ethereum blockchain and interact with smart contracts)
(If you dont have you can create a quicknode endpoint you should create a simple node binance, goerli, mumbai)
The PRIVATE_KEY is your Private key of your web3 wallet (metamask, coinbase, trust...)

```
cp .example.env .env
```

After setup `.env` go to hardhat.config.js to setup your networks provide (if you use a different network configuration). Then compile, test and deploy the smartcontract on local.

```
npx hardhat compile
npx hardhat test
npx hardhat run scripts/run.js
```

When all done and have no error now you can deploy the smartcontract on testnet.
(You can also deploy the smartcontract on other networks)
When deploy the contract you should have money to deploy the contract you should faucet some coin before deploy

```
npx hardhat run scripts/deploy.js --network bsc
```

Then copy the smartcontract address into CONTRACT_ADDRESS in folder app/src/config/contract.config.js
Copy the ABI (if you change the smartcontract) into CONTRACT_ABI 

Now cd to app folder and install package

```
cd app
npm install
```

Finally run your app

```
npm start
```

### Thanks for reading :heart:
### Have a nice day :heart:
