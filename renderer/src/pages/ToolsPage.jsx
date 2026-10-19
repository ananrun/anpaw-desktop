import { useNavigate } from 'react-router-dom'

const initialBrowserUrl = 'https://www.baidu.com'

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

  const openBrowser = () => {
    window.webBrowser.show()
    void window.webBrowser.navigate(initialBrowserUrl)
    navigate('/browser')
  }

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
        <p className="tools-eyebrow">ANPAW DESKTOP</p>
        <h1 id="tools-title">工具中心</h1>
        <p className="tools-description">从这里开始，打开你需要的小工具。</p>
        <div className="tools-actions">
          <button className="tools-primary-button" type="button" onClick={openBrowser}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="8.5" />
              <path d="M3.8 12h16.4M12 3.5c2.2 2.4 3.3 5.2 3.3 8.5S14.2 18.1 12 20.5C9.8 18.1 8.7 15.3 8.7 12S9.8 5.9 12 3.5Z" />
            </svg>
            打开网页浏览
          </button>
          <button className="tools-secondary-button" type="button" onClick={() => navigate('/')}>
            回到主页
          </button>
        </div>
      </section>
    </main>
  )
}
