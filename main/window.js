const { BrowserWindow } = require('electron')
const path = require('node:path')
const { createBrowserContentController } = require('./browser-content')

const browserControllers = new WeakMap()

const getBrowserController = (webContents) => {
  const win = BrowserWindow.fromWebContents(webContents)
  return win ? browserControllers.get(win) : null
}

const createMainWindow = (app, onClosed) => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, '../../renderer/resources/logo-zhua.png'),
    webPreferences: {
      preload: path.join(__dirname, '../preload.cjs')
    }
  })
  const browserController = createBrowserContentController(win)
  browserControllers.set(win, browserController)

  if (!app.isPackaged && process.env.ELECTRON_RENDERER_URL) {
    win.loadURL(process.env.ELECTRON_RENDERER_URL)
  } else {
    win.loadFile(path.join(__dirname, '../../renderer/dist/index.html'))
  }

  win.on('resize', browserController.updateBounds)
  win.on('close', () => browserController.destroy())
  win.once('closed', () => onClosed?.())
}

module.exports = { createMainWindow, getBrowserController }
