const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');

var comingSoon = [
    'notifications',
    'messages',
]

ipcMain.on('button-click', (event, arg) => {
    console.log(arg);
    if (comingSoon.includes(arg)) {
        console.log('Coming soon!');
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