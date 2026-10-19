const registerBrowserIpc = (ipcMain, getBrowserController) => {
  ipcMain.handle('browser:show', (event) => {
    getBrowserController(event.sender)?.show()
  })

  ipcMain.handle('browser:hide', (event) => {
    getBrowserController(event.sender)?.hide()
  })

  ipcMain.handle('browser:navigate', (event, url) => {
    const browserController = getBrowserController(event.sender)
    return browserController
      ? browserController.navigate(url)
      : { ok: false, error: '主窗口不可用。' }
  })
}

module.exports = { registerBrowserIpc }
