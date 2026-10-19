const versions = window.versions

export default function App() {
  return (
    <main className="app">
      <img className="logo" src="/resources/logo-zhua.png" alt="anpaw desktop logo" />
      <h1>anpaw-desktop</h1>
      <p>React 渲染进程已连接到 Electron。</p>
      {versions && (
        <p className="versions">
          Chrome {versions.chrome()} · Node.js {versions.node()} · Electron {versions.electron()}
        </p>
      )}
    </main>
  )
}
