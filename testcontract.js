if (typeof web3 != 'undefined') {
  web3 = new Web3(web3.currentProvider);
  console.log(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

var EVAaddress = "0x68781d90b45aad5a828a52f808a12c34954cd668";   //合约生成成功后的地址

var from_Addr = web3.eth.accounts[0];
console.log(from_Addr);
var to_Addr = "0x1658da89e8b88826179db7765a3e6a7c7c32c98e";


var txhash = web3.eth.sendTransaction(to_Addr, 0, {from:from_Addr}, function(err, address) {
  if (!err)
    console.log(address);
});

// var MyContract = web3.eth.contract(abi);
// var myContractInstance = MyContract.at(EVAaddress);

// watch for an event with {some: 'args'}
// var myEvent = myContractInstance.FundTransfer({fromBlock: 0, toBlock: 'latest'});
// myEvent.watch(function(error, result){

// });

// // would get all past logs again.
// var myResults = myEvent.get(function(error, logs){
//   if (!error)
//     console.log(logs);	
// });

// would stop and uninstall the filter
//myEvent.stopWatching();