const { app, BrowserWindow } = require('electron')

const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, '../../renderer/resources/logo-zhua.png'),
    webPreferences: {
      preload: path.join(__dirname, '../preload.cjs')
    }
  })

  if (!app.isPackaged && process.env.ELECTRON_RENDERER_URL) {
    win.loadURL(process.env.ELECTRON_RENDERER_URL)
  } else {
    win.loadFile(path.join(__dirname, '../../renderer/dist/index.html'))
  }
}

app.whenReady().then(() => {
  createWindow()
})
