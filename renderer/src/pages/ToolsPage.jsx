import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function RobotIllustration() {
  return (
    <div className="robot" aria-hidden="true">
      <div className="robot-antenna">
        <span />
      </div>
      <div className="robot-head">
        <span className="robot-ear robot-ear-left" />
        <span className="robot-ear robot-ear-right" />
        <div className="robot-face">
          <span className="robot-eye" />
          <span className="robot-eye" />
          <span className="robot-smile" />
        </div>
      </div>
      <div className="robot-body">
        <span className="robot-badge">✦</span>
      </div>
      <span className="robot-arm robot-arm-left" />
      <span className="robot-arm robot-arm-right" />
      <span className="robot-shadow" />
    </div>
  )
}

export default function ToolsPage() {
  const navigate = useNavigate()
  const [anpaw, setAnpaw] = useState({ state: 'stopped', message: '正在读取服务状态…' })
  const [isStarting, setIsStarting] = useState(false)

  useEffect(() => {
    void window.anpaw.status().then(setAnpaw)
  }, [])

  const openAnpaw = async () => {
    setIsStarting(true)
    try {
      const status = anpaw.state === 'running' ? anpaw : await window.anpaw.start()
      setAnpaw(status)
      if (status.state === 'running') {
        window.webBrowser.show()
        await window.webBrowser.navigate(status.url)
        navigate('/browser', { state: { url: status.url } })
      }
    } finally {
      setIsStarting(false)
    }
  }

  const stopAnpaw = async () => setAnpaw(await window.anpaw.stop())

  return (
    <main className="tools-page">
      <button className="tools-back" type="button" onClick={() => navigate('/')}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m14.5 5-7 7 7 7M8 12h9" />
        </svg>
        返回首页
      </button>
      <section className="tools-card" aria-labelledby="tools-title">
        <RobotIllustration />
        <p className="tools-description">启动本地智能体实验台。</p>
        <section className="anpaw-tool" aria-labelledby="anpaw-title">
          <div className="anpaw-tool-heading">
            <div>
              <p className="anpaw-tool-eyebrow">LOCAL AGENT LAB</p>
              <h2 id="anpaw-title">AnPaw 智能体实验台</h2>
            </div>
            <span className={`anpaw-status anpaw-status-${anpaw.state}`}>
              <i />
              {anpaw.state === 'running'
                ? '运行中'
                : anpaw.state === 'starting'
                  ? '启动中'
                  : anpaw.state === 'error'
                    ? '异常'
                    : '未启动'}
            </span>
          </div>
          <p className="anpaw-tool-description">
            使用本机打包产物启动 AnPaw，可选择智能体、模型并查看 Agent Loop 运行链路。
          </p>
          <p className="anpaw-message" role={anpaw.state === 'error' ? 'alert' : 'status'}>
            {anpaw.message}
          </p>
          <div className="anpaw-actions">
            <button
              className="anpaw-open-button"
              type="button"
              onClick={openAnpaw}
              disabled={isStarting}
            >
              {isStarting ? '启动中…' : anpaw.state === 'running' ? '打开实验台' : '启动并打开'}
            </button>
            {anpaw.state === 'running' && (
              <button className="anpaw-stop-button" type="button" onClick={stopAnpaw}>
                停止服务
              </button>
            )}
          </div>
        </section>
      </section>
    </main>
  )
}
