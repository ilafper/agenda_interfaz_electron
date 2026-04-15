const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('apiMongo', {
  clientes: () => ipcRenderer.invoke('api-clientes'),
});
//exponer al renderer o archivo en el que lo vamos a usar
contextBridge.exposeInMainWorld('ApiSql', {
  clientes_sql: () => ipcRenderer.invoke('api-clientes-sql'),
  crearClienteSql:(nombre, apellidos, telefono, direccion, correo) => ipcRenderer.invoke('crear-cliente-sql', {nombre, apellidos, telefono, direccion, correo})
})