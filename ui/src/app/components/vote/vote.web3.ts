import { Component } from '@angular/core';
import Web3 from 'web3';
//import contractAbi from '../../../../../build/contracts/Voting.json';

//const contractAbi = contractJson.abi;
//console.log(contractAbi);
const contractJson = require('../../../../../build/contracts/Voting.json');
const contractAbi = contractJson.abi;

export class MyComponent {
  private providerUrl = 'HTTP://127.0.0.1:7545';
  private contractAddress = '0x19d715da617b8cd641eaa8e0690965576921C735';
  private web3: Web3;
  private contract: any;

  constructor() {
    this.web3 = new Web3(this.providerUrl);
    this.contract = new this.web3.eth.Contract(
      contractAbi,
      this.contractAddress
    );
  }
  public async vote() {
    const candidateId = 1;
    const tx = await this.contract.methods
      .vote(candidateId)
      .send({ from: this.web3.eth.defaultAccount });
    console.log('Transaction hash:', tx.transactionHash);
  }
}
