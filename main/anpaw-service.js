const { spawn } = require('node:child_process')
const path = require('node:path')

const anpawUrl = 'http://127.0.0.1:8095/'
const anpawResourcePath = path.join('renderer', 'resources', 'anpaw', 'AnPaw.exe')

const getExecutablePath = (app) =>
  app.isPackaged
    ? path.join(process.resourcesPath, 'app.asar.unpacked', anpawResourcePath)
    : path.join(__dirname, '../../', anpawResourcePath)

const createAnpawService = (app) => {
  let anpawProcess = null
  let status = { state: 'stopped', message: 'AnPaw 尚未启动。' }

  const getStatus = () => ({ ...status, url: anpawUrl })

  const waitForReady = async (timeout = 12000) => {
    const deadline = Date.now() + timeout
    while (Date.now() < deadline) {
      if (status.state === 'error') return false
      try {
        const response = await fetch(`${anpawUrl}agents`)
        if (response.ok) return true
      } catch {
        // 服务仍在初始化，继续探测。
      }
      await new Promise((resolve) => setTimeout(resolve, 250))
    }
    return false
  }

  const start = async () => {
    if (anpawProcess && !anpawProcess.killed) return getStatus()

    const executable = getExecutablePath(app)
    status = { state: 'starting', message: '正在启动 AnPaw 服务…' }
    try {
      anpawProcess = spawn(executable, ['--server'], {
        cwd: path.dirname(executable),
        detached: false,
        stdio: 'ignore',
        windowsHide: true
      })
    } catch (error) {
      status = { state: 'error', message: `无法启动 AnPaw：${error.message}` }
      anpawProcess = null
      return getStatus()
    }

    anpawProcess.once('error', (error) => {
      status = { state: 'error', message: `无法启动 AnPaw：${error.message}` }
      anpawProcess = null
    })
    anpawProcess.once('exit', (code) => {
      if (status.state !== 'stopped') {
        status = {
          state: 'error',
          message: `AnPaw 已退出${code === null ? '。' : `（退出码 ${code}）。`}`
        }
      }
      anpawProcess = null
    })

    if (await waitForReady()) {
      status = { state: 'running', message: 'AnPaw 服务正在运行。' }
    } else if (status.state === 'starting') {
      status = { state: 'error', message: 'AnPaw 启动超时，请检查打包产物和 8095 端口。' }
    }
    return getStatus()
  }

  const stop = () => {
    if (anpawProcess && !anpawProcess.killed) anpawProcess.kill()
    anpawProcess = null
    status = { state: 'stopped', message: 'AnPaw 已停止。' }
    return getStatus()
  }

  return { getStatus, start, stop }
}

module.exports = { createAnpawService }
