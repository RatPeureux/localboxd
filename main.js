// Importation des modules nécessaires d'Electron
const { app, BrowserWindow } = require('electron');
const path = require('path');

// Fonction pour créer la fenêtre principale
function createWindow() {
  // Créer une nouvelle fenêtre de navigateur
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'icon.png'), // Ajoutez un chemin vers votre icône
    webPreferences: {
      // Préférence de sécurité importante pour l'intégration de Node.js dans le rendu
      // Pour les applications personnelles/locales, on peut souvent l'activer
      nodeIntegration: true,
      contextIsolation: false, // Attention: À utiliser avec précaution, mais simplifie l'exemple
      preload: path.join(__dirname, 'preload.js') // Peut être omis pour cet exemple minimal
    }
  });

  // Charger le fichier index.html de l'application
  mainWindow.loadFile('index.html');

  // Optionnel: Ouvrir les outils de développement (DevTools)
  // mainWindow.webContents.openDevTools();
}

// Cette méthode sera appelée lorsqu'Electron aura terminé
// l'initialisation et est prêt à créer des fenêtres de navigateur.
app.whenReady().then(() => {
  createWindow();

  // Pour macOS, activez la création d'une nouvelle fenêtre lorsque
  // l'icône du dock est cliquée et qu'il n'y a pas d'autres fenêtres ouvertes.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quitter lorsque toutes les fenêtres sont fermées, sauf sur macOS.
// Sur macOS, il est courant que les applications restent actives
// jusqu'à ce que l'utilisateur quitte explicitement avec Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// NOTE IMPORTANTE: Pour une application de production, il est crucial
// de sécuriser les "webPreferences". Laissez 'contextIsolation: true'
// et utilisez un script 'preload.js' pour exposer uniquement les API nécessaires
// entre le processus principal et le processus de rendu.