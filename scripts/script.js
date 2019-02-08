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

  fetchLastBlock().then(response => {
    /* We get a Promise, so we need to use a then method to
    /* manipulate a response from that promise
     */
    if (response.ok) {
      return response.json();
    }
    throw new Error("Api did not respond");
  }).then(response => {
      let lastBlockMined = parseInt(response.result, 16); //parse for dec from hex

      let access = document.getElementById("lastBlock");
      access.innerHTML = "Last Block: " +  lastBlockMined;
    });

  fetchEthPrice().then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Api did not respond");
  }).then(response => {
      let ethPrice = response.result.ethbtc;

      let priceUSD = document.getElementById("priceUSD");
      priceUSD.innerHTML = response.result.ethusd;
      let priceBTC = document.getElementById("priceBTC");
      priceBTC.innerHTML = response.result.ethbtc;
      at.innerHTML = " @ ";
      btceth.innerHTML =  " BTC/ETH";
    });

  fetchTotalEther().then(response => {
    // we get a Promise, so we need to use a then method to
    // manipulate a response from that promise
    if (response.ok) {
      return response.json();
    }
    throw new Error("Api did not respond");
  }).then(response => {
      let totalEther = response.result/10e17;

      // marketCap = totalEther * price
      let priceUSD = parseInt(document.getElementById("priceUSD").innerHTML);
      let marketCap = totalEther * priceUSD;
      document.getElementById("marCap").innerHTML = "Market cap of $" + (marketCap/10e8).toFixed(3) + " Billion";
      console.log ((marketCap/10e8).toFixed(3));
      // TO DO:
      // https://stackoverflow.com/questions/28250680/how-do-i-access-previous-promise-results-in-a-then-chain
    })

}//end fetchData
window.onload = fetchData();
