const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const fs = require('fs');
const { interface, bytecode } = require('./compile');

// WARN: Store your 12 word mnemonic seed phrase in .mnemonic and don't push to source control
const mnemonic = fs.readFileSync(".mnemonic").toString().trim();

const provider = new HDWalletProvider(
  mnemonic,
  'https://rinkeby.infura.io/v3/ad7c1f74f25741be9badd9ba7299f32b'
)

const web3 = new Web3(provider);

const deploy = async() => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({ data: bytecode, arguments: ['Hi there!'] })
  .send({ from: accounts[0], gas: '1000000', gasPrice: '5000000000' })

  console.log('Contract deployed to ', result.options.address);
};

deploy();