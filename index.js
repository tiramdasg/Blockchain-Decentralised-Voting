
async function connectWallet()
{
    const web3 = new Web3(window.ethereum);
    if (typeof window.ethereum !== "undefined"){
        console.log("Metamask is installed.")
        const w_addr = await web3.requestAccount; 
        console.log(w_addr);
        //document.getElementById("w_addr").innerHTML=w_addr;

    
    }
    else{ console.log("Metamask is not installed")}
    
    
}

/*document.getElementById('connectButton', connect);

function connect() {
  ethereum
    .request({ method: 'eth_requestAccounts' })
    .then(handleAccountsChanged)
    .catch((error) => {
      if (error.code === 4001) {
        // EIP-1193 userRejectedRequest error
        console.log('Please connect to MetaMask.');
      } else {
        console.error(error);
      }
    });
} */
