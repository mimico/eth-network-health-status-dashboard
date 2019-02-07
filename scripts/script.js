let fetchData = () => {

  /* get the number of the last block mined */
  let fetchLastBlock = () => {
    //example: {"jsonrpc":"2.0","id":83,"result":"0x6d918b"}
    let url = "https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=YourApiKeyToken";
    let data =  fetch(url); //return a promise.
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
    access.innerHTML += lastBlockMined;
  })

  /* get the last ether price in btc and usd */

  /* marketCap = totalEther * price */

}//end fetchData
window.onload = fetchData();
