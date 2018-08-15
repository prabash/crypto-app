const electron = require('electron');
const BrowserWindow = electron.remote.BrowserWindow;
const axios = require('axios');

const notifyBtn = document.getElementById('notifyBtn');
var price = document.querySelector('h1');
var targetPrice = document.getElementById('targetPrice');

function getBTC() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD').
        then(res => {
            const cryptos = res.data.BTC.USD;
            price.innerHTML = '$' + cryptos.toLocaleString('en');
        })
}

getBTC();
setInterval(getBTC, 30000);

notifyBtn.addEventListener('click', function () {
    // frame false will remove the frame around the window (with min, max, close buttons)
    let win = new BrowserWindow({ frame: false, transparent: true, alwaysOnTop: true, width: 400, height: 200 });
    win.on('close', function () { win = null });
    win.loadFile('src/add.html');
    win.show();
})
