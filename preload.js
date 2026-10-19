const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron
})

contextBridge.exposeInMainWorld('webBrowser', {
  show: () => ipcRenderer.invoke('browser:show'),
  hide: () => ipcRenderer.invoke('browser:hide'),
  navigate: (url) => ipcRenderer.invoke('browser:navigate', url)
})
