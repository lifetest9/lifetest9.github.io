if (typeof web3 != 'undefined') {
  web3 = new Web3(web3.currentProvider);
  console.log(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
//create airdrop accounts
localStorage.airdropNum = 10;
var accountObject;
for(var i=0;i<localStorage.airdropNum;i++)
{
	accountObject = web3.eth.accounts.create();
	localStorage.setItem('address'+(i+1),accountObject.address);
	localStorage.setItem('privatekey'+(i+1),accountObject.privateKey);
}