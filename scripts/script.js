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
    let ethUSDprice;
    let lastBlockMined;
    let totalWei;
    for (let i = 0; i < responses.length; i++) {
      if (responses[i].ok) {
        responses[i].json().then(result => ({
          result: result
        })).then (res => {
              switch(i) {
                case 0:
                  let access = document.getElementById("lastBlock");
                  lastBlockMined = parseInt(res.result.result, 16); //parse from hex to dec
                  access.innerHTML = "Last Block:",lastBlockMined;
                  break;
                case 1:
                  let priceUSD = document.getElementById("priceUSD");
                  let priceBTC = document.getElementById("priceBTC");
                  ethUSDprice = res.result.result.ethusd;
                  priceUSD.innerHTML = res.result.result.ethusd;
                  priceBTC.innerHTML = res.result.result.ethbtc;
                  at.innerHTML = " @ ";
                  btceth.innerHTML =  " BTC/ETH";
                  break;
                case 2:
                  totalWei = res.result.result
                  let totalEther = totalWei/10e17;
                  //console.log("all: ",ethUSDprice,lastBlockMined,totalWei);
                  //console.log("marketcap: ", totalEther*ethUSDprice);
                  let marketCap = totalEther * ethUSDprice;
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
