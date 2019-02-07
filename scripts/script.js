let fetchData = () => {

  /* get the number of the last block mined */
  let fetchLastBlock = () => {
    //example: {"jsonrpc":"2.0","id":83,"result":"0x6d918b"}
    let url = "https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=YourApiKeyToken";
    let data =  fetch(url); //returns a promise.
    return data;
  }//end fetchLastBlock

  fetchLastBlock().then(response => {
    /* we get a Promise, so we need to use a then method to
    manipulate a response from that promise */
    if (response.ok) {
      return response.json();
    }
    throw new Error("Api did not respond");
  }).then(response => {
    /* process json for data required */
    //console.log("response: " + response);
    lastBlockMined = parseInt(response.result, 16); //parse for dec from hex
    var access = document.getElementById("lastBlock");
    access.innerHTML = "Last Block: " +  lastBlockMined;
  })

  /* get the last ether price in btc and usd */

  let fetchEthPrice = () => {
    //{"status":"1","message":"OK","result":{"ethbtc":"0.03077","ethbtc_timestamp":"1549581188","ethusd":"104.62","ethusd_timestamp":"1549581181"}}
    let url = "https://api.etherscan.io/api?module=stats&action=ethprice&apikey=YourApiKeyToken";
    let data =  fetch(url); //returns a promise.
    return data;
  }//end fetchLastBlock

  fetchEthPrice().then(response => {
    /* we get a Promise, so we need to use a then method to
    manipulate a response from that promise */
    if (response.ok) {
      return response.json();
    }
    throw new Error("Api did not respond");
  }).then(response => {
    /* process json for data required */
    console.log("result usd: " + response.result.ethusd);
    console.log("result usd: " + response.result.ethbtc);
    let price = document.getElementById("price");
    price.innerHTML = response.result.ethusd + " @ " + response.result.ethbtc + " BTC/ETH";
  })




  /* marketCap = totalEther * price */

}//end fetchData
window.onload = fetchData();
