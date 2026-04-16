const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('apiMongo', {
  clientes: () => ipcRenderer.invoke('api-clientes'),
});



//exponer al renderer o archivo en el que lo vamos a usar
contextBridge.exposeInMainWorld('ApiSql', {
  clientes_sql: () => ipcRenderer.invoke('api-clientes-sql'),
  crearClienteSql:(nombre, apellidos, telefono, direccion, correo) => ipcRenderer.invoke('crear-cliente-sql', {nombre, apellidos, telefono, direccion, correo}),
  borrarClienteSql:(id_eliminar) => ipcRenderer.invoke('borrar-cliente-sql', id_eliminar),
  filtroNombreSql:(nombreBusqueda) => ipcRenderer.invoke('filtro-nombre-cliente', nombreBusqueda),
  filtroApellidoSql:(apellidosBusqueda) => ipcRenderer.invoke('filtro-apellidos-cliente', apellidosBusqueda),
  
  filtroDireccionSql:(direccion) => ipcRenderer.invoke('filtro-direccion-cliente', direccion),
  filtroCorreoSql:(correo) => ipcRenderer.invoke('filtro-correo-cliente', correo),
  filtroTelefonoSql:(telefono) => ipcRenderer.invoke('filtro-telefono-cliente', telefono),
})