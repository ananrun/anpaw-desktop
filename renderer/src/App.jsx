import { useState } from 'react'

const versions = window.versions
const logoUrls = Object.entries(
  import.meta.glob('../resources/*.png', {
    eager: true,
    import: 'default',
    query: '?url'
  })
)
  .sort(([firstPath], [secondPath]) => firstPath.localeCompare(secondPath))
  .map(([, url]) => url)

const initialLogoIndex = Math.max(
  logoUrls.findIndex((url) => url.includes('logo-pigu')),
  0
)

export default function App() {
  const [logoIndex, setLogoIndex] = useState(initialLogoIndex)
  const logoUrl = logoUrls[logoIndex]

  const changeLogo = () => {
    setLogoIndex((currentIndex) => (currentIndex + 1) % logoUrls.length)
  }

  return (
    <main className="app">
      <div className="title">
        <div className="title-item">Tools</div>
        <div className="title-item">More</div>
      </div>
      <button
        className="logo-button"
        type="button"
        onClick={changeLogo}
        aria-label="切换 anpaw 图标"
      >
        <img className="logo" src={logoUrl} alt="anpaw desktop logo" />
      </button>
      <h1>anpaw</h1>
      {versions && (
        <p className="versions">
          Chrome {versions.chrome()} · Node.js {versions.node()} · Electron {versions.electron()}
        </p>
      )}
      <p className="copyright">©changan</p>
    </main>
  )
}
