// app/src/preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    minimize: () => ipcRenderer.send('minimize-app'),
    maximize: () => ipcRenderer.send('maximize-app'),
    close: () => ipcRenderer.send('close-app')
});