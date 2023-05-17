const Web3 = require('web3');
const contractJson = require('./build/contracts/Voting.json');
const contractAbi = contractJson.abi;
const providerUrl = 'HTTP://127.0.0.1:7545';
const web3 = new Web3(providerUrl);

async function getAccountList() {
  const accounts = await web3.eth.getAccounts();
  console.log(accounts)
  return accounts.slice(0, 10); // get first 10 accounts
}

async function getCandidateCount() {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = contractJson.networks[networkId];
  const contractAddress = deployedNetwork.address;

  const contract = new web3.eth.Contract(contractAbi, contractAddress);

  const candidateCount = await contract.methods.candidateCount().call();
  return candidateCount;
}

async function addCandidate(name, party) {
  const accounts = await web3.eth.getAccounts();
  const defaultAccount = accounts[0];

  const networkId = await web3.eth.net.getId();
  const deployedNetwork = contractJson.networks[networkId];
  const contractAddress = deployedNetwork.address;

  const contract = new web3.eth.Contract(contractAbi, contractAddress, { from: defaultAccount });

  const tx = await contract.methods.addCandidate(name, party).send({ from: defaultAccount, gas: '3000000' });
  return tx.transactionHash;
}

async function startVoting() {
  const accounts = await web3.eth.getAccounts();
  const defaultAccount = accounts[0];

  const networkId = await web3.eth.net.getId();
  const deployedNetwork = contractJson.networks[networkId];
  const contractAddress = deployedNetwork.address;
  
  const contract = new web3.eth.Contract(contractAbi, contractAddress, { from: defaultAccount });
  const admin = await contract.methods.getAdmin().call();
  const startTx = await contract.methods.startVoting().send({ from: defaultAccount });
  return startTx.transactionHash;
}

async function vote(candidateIndex, account) {
  console.log("The account I got is "+account)
  const accounts = await web3.eth.getAccounts();
  const defaultAccount = accounts[0];

  const networkId = await web3.eth.net.getId();
  const deployedNetwork = contractJson.networks[networkId];
  const contractAddress = deployedNetwork.address;

  const contract = new web3.eth.Contract(contractAbi, contractAddress, { from: defaultAccount });

  const accountList = await getAccountList();
  const account11 = account;
  console.log(account11)
const address1 = '0x4f9d2Fb82fC776ecDa0F550278f883112868d8C1'; // provided address from backend
if (accounts.includes(account11)) {
const account = web3.eth.accounts.create();
  // add the account to the wallet
  web3.eth.accounts.wallet.add(account.privateKey);
  // create a transaction
  const transaction = {
    to: defaultAccount,
    value: '1000000000000000',
    gas: 2000000
  };
    const voteTx = await contract.methods.vote(candidateIndex).send({ from: account11, gas: '3000000' });
    const signedTransaction = await web3.eth.accounts.signTransaction(transaction, account.privateKey);
    console.log('Vote transaction hash:', voteTx.transactionHash);
    return "Vote transaction hash: "+ voteTx.transactionHash;
  } else {
    console.log('Invalid address');
    return "Invalid address";
  }

}

async function endVoting() {
  const accounts = await web3.eth.getAccounts();
  const defaultAccount = accounts[0];

  const networkId = await web3.eth.net.getId();
  const deployedNetwork = contractJson.networks[networkId];
  const contractAddress = deployedNetwork.address;

  const contract = new web3.eth.Contract(contractAbi, contractAddress, { from: defaultAccount });
  const admin = await contract.methods.getAdmin().call();
  const endTx = await contract.methods.endVoting().send({ from: defaultAccount });
  return endTx.transactionHash;
}
//addCandidate('Sujay Chavan', 'HAHAHAHA');
//startVoting()
//vote(1,"0x597195f6394f3FFdE251B5d15C96CB4b84c3b65a")
//getAccountList()
module.exports = {getAccountList,addCandidate,vote};