import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const initialBrowserUrl = 'https://www.baidu.com'

export default function BrowserPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [url, setUrl] = useState(location.state?.url || initialBrowserUrl)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const loadUrl = async (value) => {
    setIsLoading(true)
    try {
      const result = await window.webBrowser.navigate(value)
      if (result.ok) {
        setUrl(result.url)
        setError('')
      } else {
        setError(result.error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    window.webBrowser.show()
    return () => window.webBrowser.hide()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    await loadUrl(url)
  }

  return (
    <main className="browser-page">
      <header className="browser-toolbar">
        <button
          className="back-button"
          type="button"
          onClick={() => navigate('/')}
          aria-label="返回首页"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m14.5 5-7 7 7 7M8 12h9" />
          </svg>
          <span>返回</span>
        </button>
        <form className="address-form" onSubmit={handleSubmit}>
          <div className="address-field">
            <svg className="address-icon" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="5" y="10" width="14" height="10" rx="2" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>
            <input
              aria-label="网站地址"
              autoFocus
              className="address-input"
              inputMode="url"
              onChange={(event) => setUrl(event.target.value)}
              placeholder="输入网址，例如 https://example.com"
              type="text"
              value={url}
            />
          </div>
          <button className="go-button" type="submit" disabled={isLoading}>
            {isLoading ? '加载中' : '打开'}
            {!isLoading && (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h13m-5-5 5 5-5 5" />
              </svg>
            )}
          </button>
        </form>
        {error && (
          <span className="browser-error" role="alert">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 8v5m0 3h.01M10.3 4.9 3.6 16.4A2 2 0 0 0 5.3 19h13.4a2 2 0 0 0 1.7-2.6L13.7 4.9a2 2 0 0 0-3.4 0Z" />
            </svg>
            {error}
          </span>
        )}
      </header>
    </main>
  )
}
