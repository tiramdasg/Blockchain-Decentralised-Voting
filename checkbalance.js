const Web3 = require('web3');
const web3 = new Web3('HTTP://127.0.0.1:7545'); 

const address = '0x2111bC8A7A2433694430f62Eb50773DF34BEEF22'; 

web3.eth.getBalance(address)
  .then(balance => {
    console.log('Balance:', web3.utils.fromWei(balance, 'ether'), 'ETH');
  })
  .catch(error => {
    console.error('Error:', error);
  });