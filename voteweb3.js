const Web3 = require('web3');
const contractJson = require('./build/contracts/Voting.json')
const contractAbi = contractJson.abi;
//console.log(contractAbi);
const providerUrl = 'HTTP://127.0.0.1:7545';
const contractAddress = '0x48d7c9CA7d2d973fDD3261b1aC55580288266cbC';
const web3 = new Web3(providerUrl);
const contract = new web3.eth.Contract(contractAbi, contractAddress);


async function getCandidateCount() {
  const candidateCount = await contract.methods.candidateCount().call();
  console.log('Candidate Count:', candidateCount);
}

async function addCandidate(name, party) {
  const tx = await contract.methods.addCandidate(name, party).send({ from: web3.eth.defaultAccount });
  console.log('Transaction hash:', tx.transactionHash);
}

async function startVoting() {
  const tx = await contract.methods.startVoting().send({ from: web3.eth.defaultAccount });
  console.log('Transaction hash:', tx.transactionHash);
}

async function endVoting() {
  const tx = await contract.methods.endVoting().send({ from: web3.eth.defaultAccount });
  console.log('Transaction hash:', tx.transactionHash);
}


let hasVoted = {};
async function vote(candidateId, voterAddress) {
  // Set the account to vote from
  web3.eth.defaultAccount = voterAddress;
  const account = web3.eth.defaultAccount;

  if (hasVoted[account]) {
    console.log('You have already voted!');
    return;
  }
  else {
    const tx = await contract.methods.vote(candidateId, voterAddress).send({ from: web3.eth.defaultAccount });
    console.log('Transaction hash:', tx.transactionHash);

    hasVoted[account] = true;
    console.log(hasVoted)
  }
  
}

contract.events.userVoted().on('data', event => {
  console.log('User voted:', event.returnValues);
});

web3.eth.defaultAccount = '0xF9424A59Eee9E85977e7808Aa173d21903Be88c1'; // set the default account for transactions

addCandidate('John Doe', 'Independent');
startVoting();
vote(1,'0xF9424A59Eee9E85977e7808Aa173d21903Be88c1');
endVoting();

