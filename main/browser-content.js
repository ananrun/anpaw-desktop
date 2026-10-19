const { shell, WebContentsView } = require('electron')

const browserToolbarHeight = 52

const normalizeUrl = (value) => {
  if (typeof value !== 'string' || !value.trim()) return null

  const valueWithProtocol = /^[a-z][a-z\d+.-]*:/i.test(value.trim())
    ? value.trim()
    : `https://${value.trim()}`

  try {
    const url = new URL(valueWithProtocol)
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : null
  } catch {
    return null
  }
}

const createBrowserContentController = (win) => {
  let contentView = null
  let isAttached = false

  const updateBounds = () => {
    if (!contentView) return

    const [width, height] = win.getContentSize()
    contentView.setBounds({
      x: 0,
      y: browserToolbarHeight,
      width,
      height: Math.max(0, height - browserToolbarHeight)
    })
  }

  const show = () => {
    if (!contentView) {
      contentView = new WebContentsView({
        webPreferences: {
          contextIsolation: true,
          nodeIntegration: false,
          sandbox: true
        }
      })
      contentView.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith('https://') || url.startsWith('http://')) {
          shell.openExternal(url)
        }
        return { action: 'deny' }
      })
    }

    if (!isAttached) {
      win.contentView.addChildView(contentView)
      isAttached = true
    }
    updateBounds()
  }

  const hide = () => {
    if (contentView && isAttached) {
      win.contentView.removeChildView(contentView)
      isAttached = false
    }
  }

  const navigate = async (value) => {
    const url = normalizeUrl(value)
    if (!url) return { ok: false, error: '请输入有效的 http 或 https 地址。' }

    show()
    try {
      await contentView.webContents.loadURL(url)
      return { ok: true, url }
    } catch {
      return { ok: false, error: '网页加载失败，请检查网址或网络连接。' }
    }
  }

  const destroy = () => {
    hide()
    if (contentView && !contentView.webContents.isDestroyed()) {
      contentView.webContents.close()
    }
    contentView = null
    isAttached = false
  }

  return { destroy, hide, navigate, show, updateBounds }
}

module.exports = { createBrowserContentController }
