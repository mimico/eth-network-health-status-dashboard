let fetchData = () => {

  //example: {"jsonrpc":"2.0","id":83,"result":"0x6d918b"}
  let url = "https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=YourApiKeyToken";
  console.log(url);
  let stuff =  fetch(url); //return a promise.
  console.log (stuff);  //got a promise :-)
  return stuff;

}//end fetchData

fetchData().then(response => {
  /* we get a Promise, so we need to use a then method to
  manipulate a response from that promise */
  console.log(response);
  if (response.ok) {
    return response.json();
  }
  throw new Error("Api did not respond");
}).then(response => {
  // process json for data required
  console.log("response: " + response);
  var lastBlockMinedHex = response.result; //an array of objects
  console.log("lastBlockMinedHex: " + lastBlockMinedHex);
  console.log("lastBlockMinedDec: " + parseInt(lastBlockMinedHex, 16));
})


window.onload = fetchData();
