const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const isDev = true; 

// Désactive l'accélération matérielle (logs d'erreur GPU)
app.disableHardwareAcceleration();

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    icon: path.join(__dirname, '../public/favicon.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  if (isDev) {
    // Dev, on charge l'URL de Vite
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    // Prod, on charge le fichier construit
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
  
  ipcMain.on('minimize-app', (event) => {
    BrowserWindow.fromWebContents(event.sender).minimize();
  });

  ipcMain.on('maximize-app', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win.isMaximized()) win.unmaximize();
    else win.maximize();
  });

  ipcMain.on('close-app', (event) => {
    BrowserWindow.fromWebContents(event.sender).close();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});