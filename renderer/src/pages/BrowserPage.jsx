import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const initialBrowserUrl = 'https://www.baidu.com'

export default function BrowserPage() {
  const navigate = useNavigate()
  const [url, setUrl] = useState(initialBrowserUrl)
  const [error, setError] = useState('')

  const loadUrl = async (value) => {
    const result = await window.webBrowser.navigate(value)
    if (result.ok) {
      setUrl(result.url)
      setError('')
    } else {
      setError(result.error)
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
        <button className="back-button" type="button" onClick={() => navigate('/')}>
          返回
        </button>
        <form className="address-form" onSubmit={handleSubmit}>
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
          <button className="go-button" type="submit">
            打开
          </button>
        </form>
        {error && <span className="browser-error">{error}</span>}
      </header>
    </main>
  )
}
