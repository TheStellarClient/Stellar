const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    sendButtonClick: (message) => ipcRenderer.send('button-click', message)
});

window.addEventListener('DOMContentLoaded', () => {
    const elements = Array.from(document.querySelectorAll('*')).filter(element => {
        return window.getComputedStyle(element).cursor === 'pointer';
    });
  
    elements.forEach((element) => {
        element.addEventListener('click', () => {
            if (element.id === '') {
                return;
            }
            ipcRenderer.send('button-click', element.id);
        });
    });
});