const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('apiMongo', {
  clientes: () => ipcRenderer.invoke('api-clientes')
});