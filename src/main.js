import 'core-js/actual';
import { listen } from "@ledgerhq/logs";
import AppXrp from "@ledgerhq/hw-app-xrp";

import TransportWebHID from "@ledgerhq/hw-transport-webhid";

//Display the header in the div which has the ID "main"
const initial = "<h1>Connect your Nano and open the XRP app. Click anywhere to start...</h1>";
const $main = document.getElementById("main");
$main.innerHTML = initial;

document.body.addEventListener("click", async () => {
  $main.innerHTML = initial;
  try {
    const transport = await TransportWebHID.create();

    //listen to the events which are sent by the Ledger packages in order to debug the app
    listen(log => console.log(log))

    //When the Ledger device connected it is trying to display the bitcoin address
    const appXrp = new AppXrp(transport);
    const { publicKey, address } = await appXrp.getAddress("44'/144'/0'/0/0");
    //publicKey.toUpperCase()

    //Display your bitcoin address on the screen
    const h2 = document.createElement("h2");
    h2.textContent = address;
    $main.innerHTML = "<h1>Your first XRP address:</h1>";
    $main.appendChild(h2);
  } catch (e) {

    //Catch any error thrown and displays it on the screen
    const $err = document.createElement("code");
    $err.style.color = "#f66";
    $err.textContent = String(e.message || e);
    $main.appendChild($err);
  }
});