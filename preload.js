const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('apiMongo', {
  clientes: () => ipcRenderer.invoke('api-clientes'),
});

contextBridge.exposeInMainWorld('ApiSql', {
  clientes_sql: () => ipcRenderer.invoke('api-clientes-sql'),
});