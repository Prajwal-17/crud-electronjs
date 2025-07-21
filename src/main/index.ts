import { app, BrowserWindow } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { setUpIpcHandlers } from './ipcHandlers';

let mainWindow: BrowserWindow;

function createWindow(): void {
  mainWindow = new BrowserWindow({
    show: false, // Hide initially for smoother load
    autoHideMenuBar: false,
    title: '', // Vite can override this
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  mainWindow.once('ready-to-show', () => {
    setTimeout(() => {
      mainWindow.maximize()
    }, (100));
    mainWindow.show();
  });

  // Electron-renderer-url is injected by the electron-vite tool
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('demo'); // windows specific, a unique identifier for windows
  setUpIpcHandlers()

  // Enable F12, disable Cmd/Ctrl+R in production
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  createWindow();

  // macOS: Reopen window when dock icon is clicked
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed (except macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
