const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const handles = require('./handles');

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1100,
    height: 750,
    resizable: false,
    frame: false,
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    icon: path.join(__dirname, 'assets', 'images', 'stellar.png'),
  });

  mainWindow.loadFile(path.join(__dirname, 'pages/play.html'));

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.executeJavaScript(`
      (function() {
        const container = document.querySelector('#main-container');
        if (container) {
          const { width, height } = container.getBoundingClientRect();
          return { width, height };
        } else {
          return null;
        }
      })();
    `)
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});