if (typeof web3 != 'undefined') {
  web3 = new Web3(web3.currentProvider);
  console.log(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

for(var i=0;i<10;i++)
{
	web3.eth.accounts.create();
}

var accounts = web3.eth.accounts;
console.log(accounts); 
var from_Addr = "0x41c061905B1A532f3b799a30aeA02E91ad58E1a4";
for(var j=0;j<accounts.length;j++)
{
	var txhash = web3.eth.sendTransaction(accounts[j], web3.toWei(.005, "ether"), {from:from_Addr}, function(err, address) {
	  if (!err)
	    console.log("send to "+accounts[j]+":success");
	});
}