let fetchData = () => {

  /* get the number of the last block mined */
  let fetchLastBlock = () => {
    //example: {"jsonrpc":"2.0","id":83,"result":"0x6d918b"}
    let url = "https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=YourApiKeyToken";
    let data =  fetch(url); //returns a promise.
    return data;
  }//end fetchLastBlock

  /* get the last ether price in btc and usd */
  let fetchEthPrice = () => {
    //{"status":"1","message":"OK","result":{"ethbtc":"0.03077","ethbtc_timestamp":"1549581188","ethusd":"104.62","ethusd_timestamp":"1549581181"}}
    let url = "https://api.etherscan.io/api?module=stats&action=ethprice&apikey=YourApiKeyToken";
    let data =  fetch(url); //returns a promise.
    return data;
  }//end fetchLastBlock

  /*get total supply of ether*/
  let fetchTotalEther = () => {
    //example: {"status":"1","message":"OK","result":"104764826749100000000000000"}
    let url = "https://api.etherscan.io/api?module=stats&action=ethsupply&apikey=YourApiKeyToken";
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
                  lastBlockMined = parseInt(res.result.result, 16); //parse from hex to dec
                  document.getElementById("lastBlock").innerHTML = "Last Block: " + lastBlockMined;
                  break;
                case 1:
                  ethUSDprice = res.result.result.ethusd;
                  ethBTCprice = res.result.result.ethbtc;
                  document.getElementById("price").innerHTML = ethUSDprice + " @ " + ethBTCprice + " BTC/ETH";
                  break;
                case 2:
                  totalWei = res.result.result
                  totalEther = totalWei/10e17;
                  marketCap = totalEther * ethUSDprice;
                  document.getElementById("marCap").innerHTML = "Market cap of $" + (marketCap/10e8).toFixed(3) + " Billion";
                  break;
              }
            });
        }
     }
  });
}//end fetchData

window.onload = fetchData();

let searchClick  = () => {
  let fetchAccountBalance = () => {
    let address = document.getElementById("address").value;
    console.log("address: ",address);
    let url = "https://api.etherscan.io/api?module=account&action=balance&address=0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a&tag=latest&apikey=YourApiKeyToken";
    console.log (url);
    let data =  fetch(url); //returns a promise.
    console.log ("data: ",data);
    return data;
  }
  fetchAccountBalance().then(response => {
    if (response.ok) {
      return response.json();
    }throw new Error("Api did not respond");
  }).then(response => {
      let balance = response.result/10e17;
      console.log("balance: ", balance);
  })
}
