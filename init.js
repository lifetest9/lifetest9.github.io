if (typeof web3 != 'undefined') {
  web3 = new Web3(web3.currentProvider);
  console.log(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}


//init every airdrop account with 0.005 eth from main account
var from_Addr = "0x41c061905B1A532f3b799a30aeA02E91ad58E1a4";

var privateKey = '0x3859d5b78e04d0460f0cbb800bc5231bee649161ad431cc539e18eac6e45c77f';
for(var j=0;j<localStorage.airdropNum;j++)
{
	var tx ={
		from: "0x41c061905B1A532f3b799a30aeA02E91ad58E1a4",
	    to: localStorage.getItem("address"+(j+1)),
	    value: web3.utils.toWei("0.005", "ether"),
	    gas: 2000000
	}
  	web3.eth.signTransaction(tx, privateKey).then(signed => {
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

	// web3.eth.sendTransaction({
 //                to: localStorage.getItem("address1"),
 //                value:  web3.utils.toWei("0.005", "ether"),
 //                from: "0x41c061905B1A532f3b799a30aeA02E91ad58E1a4"
 //            });  //send the transaction
