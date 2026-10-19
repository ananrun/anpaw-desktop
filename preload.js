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

contextBridge.exposeInMainWorld('anpaw', {
  status: () => ipcRenderer.invoke('anpaw:status'),
  start: () => ipcRenderer.invoke('anpaw:start'),
  stop: () => ipcRenderer.invoke('anpaw:stop')
})
