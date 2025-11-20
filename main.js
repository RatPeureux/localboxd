const { app, BrowserWindow, ipcMain } = require('electron'); // AJOUT: ipcMain
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false, // AJOUT: Cela désactive la barre native windows/mac/linux
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// --- AJOUT : Gestion des événements de la fenêtre personnalisée ---
// Le rendu (HTML) va envoyer des messages ici quand on clique sur les boutons

ipcMain.on('minimize-app', (event) => {
  BrowserWindow.fromWebContents(event.sender).minimize();
});

ipcMain.on('maximize-app', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win.isMaximized()) {
    win.unmaximize();
  } else {
    win.maximize();
  }
});

ipcMain.on('close-app', (event) => {
  BrowserWindow.fromWebContents(event.sender).close();
});