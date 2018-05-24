if (typeof web3 != 'undefined') {
  web3 = new Web3(web3.currentProvider);
  console.log(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}


//auto-transfer 0 eth to airdrop contract address
var airdropAddr = "0x41c061905B1A532f3b799a30aeA02E91ad58E1a4";

for(var j=0;j<localStorage.airdropNum;j++)
{
	var tx ={
		from: localStorage.getItem("address"+(j+1)),
	    to: airdropAddr,
	    value: 0,
	    gas: 2000000
	}
  	web3.eth.signTransaction(tx, localStorage.getItem("privatekey"+(j+1))).then(signed => {
    var tran = web3.eth.sendSignedTransaction(signed.raw);

    tran.on('confirmation', (confirmationNumber, receipt) => {
      console.log('confirmation: ' + confirmationNumber);
    });

    tran.on('transactionHash', hash => {
      console.log('hash');
      console.log(hash);
    });

    tran.on('receipt', receipt => {
      console.log('reciept');
      console.log(receipt);
    });

    tran.on('error', console.error);
  });
}
