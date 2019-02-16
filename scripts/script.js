let fetchData = () => {

  /* get the number of the last block mined */
  let fetchLastBlock = () => {
    //example: {"jsonrpc":"2.0","id":83,"result":"0x6d918b"}
    let url = 'https://api.etherscan.io/api?module=proxy&action=' +
'eth_blockNumber&apikey=YourApiKeyToken';
    let data =  fetch(url); //returns a promise.
    return data;
  }//end fetchLastBlock

  /* get the last ether price in btc and usd */
  let fetchEthPrice = () => {
    /* example: {"status":"1","message":"OK",
     * "result":{"ethbtc":"0.03077","ethbtc_timestamp":"1549581188",
     * "ethusd":"104.62","ethusd_timestamp":"1549581181"}}
     */
    let url = 'https://api.etherscan.io/api?module=stats&action=' +
'ethprice&apikey=YourApiKeyToken';
    let data =  fetch(url); //returns a promise.
    return data;
  }//end fetchLastBlock

  /*get total supply of ether*/
  let fetchTotalEther = () => {
    /* example:
     * {"status":"1","message":"OK","result":"104764826749100000000000000"}
     */
    let url = 'https://api.etherscan.io/api?module=stats&action=' +
'ethsupply&apikey=YourApiKeyToken';
    let data =  fetch(url); //returns a promise.
    return data;
  }//end fetchtotalEther

  let promises = [fetchLastBlock(), fetchEthPrice(), fetchTotalEther()];
  Promise.all(promises).then(responses => {

    let totalWei;
    let totalEther;
    let ethUSDprice;
    let ethBTCprice;
    let marketCap;
    let lastBlockMined;

    for (let i = 0; i < responses.length; i++) {
      if (responses[i].ok) {
        responses[i].json().then(result => ({
          result: result
        })).then (res => {
              switch(i) {
                case 0:
                  //parse from hex to dec
                  lastBlockMined = parseInt(res.result.result, 16);
                  document.getElementById('lastBlock').innerHTML = `last block: ` +
                                                               `${lastBlockMined}`;
                  break;
                case 1:
                  ethUSDprice = res.result.result.ethusd;
                  ethBTCprice = res.result.result.ethbtc;
                  document.getElementById("price").innerHTML = `$` +
                  `${ethUSDprice} @ ${ethBTCprice} btc/eth`;
                  break;
                case 2:
                  totalWei = res.result.result
                  totalEther = totalWei/10e17;
                  marketCap = totalEther * ethUSDprice;
                  marketCapEth = (marketCap/10e8).toFixed(3);
                  document.getElementById(`marCap`).innerHTML = `market cap of $` +
                                    `${marketCapEth} billion`;
                  break;
              }
            });
        }
     }
  });
}//end fetchData

window.onload = fetchData();

//update data every 5 seconds
setInterval(() => {
  fetchData();
}, 5000);

let searchClick  = () => {
  //remove previous search result if it exists
  let oldSearch = document.getElementById('result');
  if (oldSearch)  {
    let form = document.getElementById('form');
    form.removeChild(oldSearch);
  }
  //remove previous empty string message if it exists
  let oops = document.getElementById('oops');
  if (oops) {
    let body = document.getElementById('body');
    body.removeChild(oops);
  }
  let fetchAccountBalance = () => {
    let address = document.getElementById('address').value;
    /* Test addresses:
     * 0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a
     * 0xfa106Cd43DD2730c09e2e08B00EC11EFb4D4Aa5a
     * 0x4380B82c696af09248B850f7BBA44A566263c4e2
     */

    let url = `https://api.etherscan.io/api?module=account&action=balance&address=`+
              `${address}&tag=latest&apikey=YourApiKeyToken`;
    console.log (url);

    //add the address to the DOM
    let p = document.createElement('p');
    p.setAttribute('id', 'result');
    let node = document.createTextNode(`Address: ${address}`);
    p.appendChild(node);
    let form = document.getElementById('form');
    form.appendChild(p);

    let data =  fetch(url); //returns a promise.
    return data;
  }

  let address = document.getElementById('address').value;
  if (address) {
    fetchAccountBalance().then(response => {
      if (response.ok) {
        return response.json();
      }throw new Error('Api did not respond');
    }).then(response => {
        let balance = response.result/10e17;

        //add the balance to the DOM
        let p = document.getElementById('result');
        p.innerHTML +=(`<br>Balance: ${balance} ETH`);
        let form = document.getElementById('form');
        form.appendChild(p);

        document.getElementById('address').value = ''; //clear the input
    })
  }
  else {
    let p = document.createElement('p');
    p.setAttribute('id', 'oops');
    let node = document.createTextNode('Oops! You have entered an empty search string.');
    p.appendChild(node);
    let body = document.getElementById('body');
    body.appendChild(p);
  }
}
