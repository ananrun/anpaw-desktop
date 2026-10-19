const { app, ipcMain } = require('electron')
const { createAnpawService } = require('./anpaw-service')
const { registerAnpawIpc } = require('./anpaw-ipc')
const { registerBrowserIpc } = require('./browser-ipc')
const { createMainWindow, getBrowserController } = require('./window')

const anpawService = createAnpawService(app)
const stopAnpaw = () => anpawService.stop()

app.whenReady().then(() => {
  registerBrowserIpc(ipcMain, getBrowserController)
  registerAnpawIpc(ipcMain, anpawService)
  createMainWindow(app, stopAnpaw)
})

app.on('window-all-closed', () => app.quit())
app.on('before-quit', stopAnpaw)
