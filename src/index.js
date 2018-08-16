const electron = require("electron");
const BrowserWindow = electron.remote.BrowserWindow;
const axios = require("axios");
const path = require('path');
const ipc = electron.ipcRenderer;

const notifyBtn = document.getElementById("notifyBtn");
var price = document.querySelector("h1");
var targetPrice = document.getElementById("targetPrice");
var targetPriceVal;

const notification = {
  title: "BTC Alert",
  body: "BTC just beat your target price!",
  icon: path.join(__dirname, '../assets/images/btc.png')
};

function getBTC() {
  axios
    .get(
      "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD"
    )
    .then(res => {
      const cryptos = res.data.BTC.USD;
      price.innerHTML = "$" + cryptos.toLocaleString("en");
      
      if (targetPrice.innerHTML != "" && targetPriceVal < res.data.BTC.USD) {
        const myNotificaiton = new window.Notification(notification.title, notification);
      }
    });
}

getBTC();
setInterval(getBTC, 10000);

notifyBtn.addEventListener("click", function() {
  // frame false will remove the frame around the window (with min, max, close buttons)
  let win = new BrowserWindow({
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    width: 400,
    height: 200
  });
  win.on("close", function() {
    win = null;
  });
  win.loadFile("src/add.html");
  win.show();
});

ipc.on("targetPriceVal", function(event, arg) {
  targetPriceVal = Number(arg);
  targetPrice.innerHTML = "$" + targetPriceVal.toLocaleString("en");
});
