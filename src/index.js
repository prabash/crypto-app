const electron = require('electron');
const BrowserWindow = electron.remote.BrowserWindow;

const notifyBtn = document.getElementById('notifyBtn');

notifyBtn.addEventListener('click', function () {
    // frame false will remove the frame around the window (with min, max, close buttons)
    let win = new BrowserWindow({ frame: false, transparent: true, alwaysOnTop: true, width: 400, height: 200 });
    win.on('close', function () { win = null });
    win.loadFile('src/add.html');
    win.show();
})
