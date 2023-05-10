const Web3 = require('web3');
const contractJson = require('./build/contracts/Voting.json');
const contractAbi = contractJson.abi;

const providerUrl = 'HTTP://127.0.0.1:7545';
const web3 = new Web3(providerUrl);

async function main() {
  const accounts = await web3.eth.getAccounts();
    const defaultAccount = accounts[0];
    const accountList = accounts.slice(0, 10); // get first 10 accounts
    console.log(accountList)

  const defaultAccoun = await web3.eth.accounts.create();
  //const defaultAccount = defaultAccoun.address
  console.log('New account created:', defaultAccount);

  const networkId = await web3.eth.net.getId();
  const deployedNetwork = contractJson.networks[networkId];
  const contractAddress = deployedNetwork.address;
  //const privateKey = await web3.eth.getPrivateKey(contractAddress);
  //console.log(privateKey);
  const { ethers } = require('ethers');

// Generate a new random wallet
// const wallet = ethers.Wallet.createRandom();

// // Get the address and private key
// const address = wallet.address;
// const privateKey = wallet.privateKey;

// console.log('Address:', address);
// console.log(contractAddress)
// console.log('Private Key:', privateKey);
  const contract = new web3.eth.Contract(contractAbi, contractAddress, { from: defaultAccount });
  
  const candidateCount = await contract.methods.candidateCount().call();
  // console.log('Candidate Count:', candidateCount);

  const tx = await contract.methods.addCandidate('John Doe', 'Independent').send({ from: web3.eth.defaultAccount, gas: '3000000' });
  console.log('Transaction hash:', tx.transactionHash);

  const startTx = await contract.methods.startVoting().send({ from: defaultAccount });
  console.log('Start voting transaction hash:', startTx.transactionHash);


  const address1 = '0x6cEB81e23D780520649C96d207bBABA8935fD366'; // provided address from backend
  if (accounts.includes(address1)) {
    const voteTx = await contract.methods.vote(1).send({ from: address1 });
    console.log('Vote transaction hash:', voteTx.transactionHash);
  } else {
    console.log('Invalid address');
  }

  const endTx = await contract.methods.endVoting().send({ from: defaultAccount });
  console.log('End voting transaction hash:', endTx.transactionHash);

}

main();