const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const ApiMongo = require('./api/mongo');

const ApiSql = require('./api/sql');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile('html/index.html');
  }
}

app.whenReady().then(createWindow);

// IPC handler para exponer clientes al renderer
ipcMain.handle('api-clientes', async () => {
  return await ApiMongo.clientesMongo();
});

ipcMain.handle('api-clientes-sql', async () => {
  return await ApiSql.clienteSql();
});

ipcMain.handle('crear-cliente-sql', async (event, datos) => {
  return await ApiSql.crearClienteSql(datos);
});




