if (typeof web3 != 'undefined') {
  web3 = new Web3(web3.currentProvider);
  console.log(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

function createAccount()
{
  //create airdrop accounts
  var accountNum = $("#addressnum").val();
  if(parseInt(accountNum)==0||accountNum=="")
    alert("地址数量必须是不为0的整数")
  else
  {
    alert("即将生成"+accountNum+"个地址");
    console.log(parseInt(accountNum));
    localStorage.airdropNum = parseInt(accountNum);
    var accountObject;
    for(var i=0;i<localStorage.airdropNum;i++)
    {
      accountObject = web3.eth.accounts.create();
      localStorage.setItem('address'+(i+1),accountObject.address);
      localStorage.setItem('privatekey'+(i+1),accountObject.privateKey);
    }
    initlist();
  }
}
function initlist()
{
    for(var i=0;i<localStorage.airdropNum;i++)
    {
      var accountitem='<tr><td>'+(i+1)+'</td><td> '+ localStorage.getItem('address'+(i+1))+'</td><td>'+localStorage.getItem('privatekey'+(i+1))+'</td></tr>';
      $("#accountlist").append(accountitem);
    }  
}

initlist();


$("#mainAddress").val("0x2E23b9BFf440F9d62Cc79d97BA8E2b3e6653Af09");
$("#balance").val("0.005");
$("#mainPrivatekey").val("10209d780840e1040359623be8b59a0e9ce2311b3cdd16cfd927e1cbce15f833");

function initBalance()
{
  var from_Addr = $("#mainAddress").val();
  var balance = $("#balance").val();
  privateKey = '10209d780840e1040359623be8b59a0e9ce2311b3cdd16cfd927e1cbce15f833';
  if(from_Addr==""||balance==""||privateKey=="")
    alert("主账户地址、私钥和从账户分配ETH不能为空");
  else
  {
    //alert("即将从主账户"+from_Addr+"分配"+balance+"ETH到所有从账户")
    for(var j=0;j<1;j++)
    {
      txEth = {
          "to": localStorage.getItem("address"+(j+1)),
          "gas": web3.utils.numberToHex(200000),
      };
        web3.eth.accounts.signTransaction(txEth, privateKey).then(signed => {

        var tran = web3.eth.sendSignedTransaction(signed.rawTransaction);

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

        tran.on('error', err=> {
          console.log("error");
          console.dir(err)
        });


      });
    }
  }
}

function airdrop()
{
  var airdropAddr = $("#airdropAddress").val();
  if(airdropAddr=="")
    alert("空投地址不能为空")
  else
  {
    alert("准备向地址"+airdropAddr+"空投0ETH...");
    for(var j=0;j<parseInt(localStorage.airdropNum);j++)
    {
      var tx ={
        from: localStorage.getItem("address"+(j+1)),
          to: airdropAddr,
          value: 0,
          gas: 2000000
      }
        web3.eth.accounts.signTransaction(tx, localStorage.getItem("privatekey"+(j+1))).then(signed => {
        var tran = web3.eth.sendSignedTransaction(signed.rawTransaction);

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
  }

}

function drawbackToken()
{
  var tokenAddr = $("#tokenAddr").val();
  var to_Addr = $("#sumtokenAddr").val();
  var abi=[
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "burn",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "burnFrom",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        },
        {
          "name": "_extraData",
          "type": "bytes"
        }
      ],
      "name": "approveAndCall",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "from",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Burn",
      "type": "event"
    }
  ];
  if(tokenAddr==""|to_Addr=="")
    alert("代币地址和回归地址不能为空")
  else
  {
    alert("准备收回代币"+tokenAddr+"到地址"+to_Addr);
    for(var j=0;j<parseInt(localStorage.airdropNum);j++)
    {
      var myContract = new web3.eth.Contract(abi, tokenAddr);
      var tx ={
        from: localStorage.getItem("address"+(j+1)),
          to: tokenAddr,
          value: "0x0",
          data:myContract.methods.transfer(to_Addr,1000*10**18).encodeABI()
      }

      web3.eth.getGasPrice().then(function(p) {
            tx.gasPrice = web3.utils.toHex(p);
            //获取nonce
            web3.eth.getTransactionCount(localStorage.getItem("address"+(j+1)),
            function(err, r) {
                tx.nonce = web3.utils.toHex(r);
                web3.eth.estimateGas(tx,
                function(err, gas) {
                    gas = '150000';
                    tx.gasLimit = web3.utils.toHex(gas);
                    //初始化transaction
                      web3.eth.accounts.signTransaction(tx, localStorage.getItem("privatekey"+(j+1))).then(signed => {
                var tran = web3.eth.sendSignedTransaction(signed.rawTransaction);

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
                })
            })
            return this
        })
    }
  }
}