const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');

var comingSoon = [
    'notifications',
    'messages',
]

var pageSelectors = [
    'play',
    'settings'
]

ipcMain.on('button-click', (event, arg) => {
    console.log(arg);
    if (comingSoon.includes(arg)) {
        console.log('Coming soon!');
    } else if (pageSelectors.includes(arg)) {
        BrowserWindow.getFocusedWindow().loadFile(path.join(__dirname, `../pages/${arg}.html`));
    } else {
        switch (arg) {
            case 'close':
                app.quit();
                break;
            case 'minimize':
                BrowserWindow.getFocusedWindow().minimize();
                break;
        }
    }
});