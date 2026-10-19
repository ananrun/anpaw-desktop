// Squirrel invokes the application with lifecycle arguments while installing,
// updating or uninstalling.  Do not initialize Electron's UI for those runs.
if (process.platform === 'win32' && process.argv.some((arg) => arg.startsWith('--squirrel-'))) {
  process.exit(0)
}

const { app, BrowserWindow } = require('electron')

const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, '../preload.js')
    }
  })

  win.loadFile(path.join(__dirname, '../renderer/index.html'))
}

app.whenReady().then(() => {
  createWindow()
})
