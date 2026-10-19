const registerAnpawIpc = (ipcMain, anpawService) => {
  ipcMain.handle('anpaw:status', () => anpawService.getStatus())
  ipcMain.handle('anpaw:start', () => anpawService.start())
  ipcMain.handle('anpaw:stop', () => anpawService.stop())
}

module.exports = { registerAnpawIpc }
