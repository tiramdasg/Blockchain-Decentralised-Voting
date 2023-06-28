const Web3 = require('web3');
const contractJson = require('./build/contracts/Voting.json');
const contractAbi = contractJson.abi;
const providerUrl = 'HTTP://127.0.0.1:8545';
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

async function addCandidate(name, party,info) {
  const accounts = await web3.eth.getAccounts();
  const defaultAccount = accounts[0];

  const networkId = await web3.eth.net.getId();
  const deployedNetwork = contractJson.networks[networkId];
  const contractAddress = deployedNetwork.address;

  const contract = new web3.eth.Contract(contractAbi, contractAddress, { from: defaultAccount });

  const tx = await contract.methods.addCandidate(name, party,info).send({ from: defaultAccount, gas: '3000000' });
  console.log(tx.transactionHash);
  return tx.transactionHash;

}
async function getCandidatesDetails() {
  const accounts = await web3.eth.getAccounts();
  const defaultAccount = accounts[0];

  const networkId = await web3.eth.net.getId();
  const deployedNetwork = contractJson.networks[networkId];
  const contractAddress = deployedNetwork.address;

  const contract = new web3.eth.Contract(contractAbi, contractAddress);

  const result = await contract.methods.getCandidates().call();
  console.log(result)
  return result;
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
async function hasVotingStarted() {
  const accounts = await web3.eth.getAccounts();
  const defaultAccount = accounts[0];

  const networkId = await web3.eth.net.getId();
  const deployedNetwork = contractJson.networks[networkId];
  const contractAddress = deployedNetwork.address;

  const contract = new web3.eth.Contract(contractAbi, contractAddress);

  const result = await contract.methods.hasVotingStarted().call({ from: defaultAccount });
  console.log(result)
  return result;
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

async function getVotingStatus(userAddress) {
  const accounts = await web3.eth.getAccounts();
  const defaultAccount = accounts[0];

  const networkId = await web3.eth.net.getId();
  const deployedNetwork = contractJson.networks[networkId];
  const contractAddress = deployedNetwork.address;

  const contract = new web3.eth.Contract(contractAbi, contractAddress, { from: defaultAccount });

  const Votestatus = await contract.methods.getVotingStatus().call({ from: userAddress });
  console.log("Vote Status:")
  console.log(Votestatus)
  return Votestatus;
}

async function VoteCounts() {
  const accounts = await web3.eth.getAccounts();
  const defaultAccount = accounts[0];
  console.log('Vote Count');
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = contractJson.networks[networkId];
  const contractAddress = deployedNetwork.address;

  const contract = new web3.eth.Contract(contractAbi, contractAddress, { from: defaultAccount });

  const voteCounts = await contract.methods.getVoteCounts().call();
  console.log('Vote Count:');
  console.log(voteCounts)
  return voteCounts;

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

async function resetVoting(addresses) {
  const accounts = await getAccountList();
  const defaultAccount = accounts[0];

  const networkId = await web3.eth.net.getId();
  const deployedNetwork = contractJson.networks[networkId];
  const contractAddress = deployedNetwork.address;
  const contract = new web3.eth.Contract(contractAbi, contractAddress);

  const admin = await contract.methods.getAdmin().call();
  if (defaultAccount !== admin) {
    throw new Error('Only the admin can reset the voting status');
  }

  const resetPromises = addresses.map(async (address) => {
    const resetTx = await contract.methods.resetUser(address).send({ from: defaultAccount, gas: '3000000' });
    console.log(`Reset transaction hash for address ${address}:`, resetTx.transactionHash);
    return resetTx.transactionHash;
  });

  try {
    const resetTransactionHashes = await Promise.all(resetPromises);
    console.log('Reset transaction hashes:', resetTransactionHashes);
    return resetTransactionHashes;
  } catch (error) {
    console.error('Error resetting voting status:', error);
    return error.message;
  }
}

//addCandidate('dfd', 'ABC Party',"Vote for me!");
//startVoting();
//vote(1,"0x048c06a32c8f64B5278fD78a1D271Aa85704ea7A");
//getCandidatesDetails()
//getVotingStatus("0x15194bc9f434882cd8d7B9c5603196c58803fc73")
//resetContract()
//resetUserVotingStatus()
// resetVoting([
//   '0x271146B2C939147857b9ca4E1D1d2B13e570A20c',
//   '0xE4F99AA806D593c3Cf5d34bE8737f8c5EA1B897F',
//   '0x83E05EC7E11100ffc34a79E9C820e4c1B8B1c73E',
//   '0x492D889a62f5d7c5b073F2554482C04da22EE63d',
//   '0x23Ba9CDA21024D6c377192803c380aB228271CB8',
//   '0xF7E3c0A6a1a92F29FF57303E359391A66FDe11F6',
//   '0x8De3D6eC5426A771aFc272F42aC6688A1d9EB50b',
//   '0xAe521FA639AE4197AE939370ac1f45f561aC019C',
//   '0x4227bBcEA68144D0939497D7EEB8e819aB752291',
//   '0x048c06a32c8f64B5278fD78a1D271Aa85704ea7A'
// ])
//VoteCounts()
//getCandidateCount()
module.exports = {getAccountList,addCandidate,vote,getCandidatesDetails,startVoting,hasVotingStarted,endVoting,VoteCounts,getVotingStatus,getCandidateCount,resetVoting};
