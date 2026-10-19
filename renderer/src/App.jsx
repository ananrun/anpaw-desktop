import { HashRouter, Route, Routes } from 'react-router-dom'
import BrowserPage from './pages/BrowserPage'
import HomePage from './pages/HomePage'
import ToolsPage from './pages/ToolsPage'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/browser" element={<BrowserPage />} />
      </Routes>
    </HashRouter>
  )
}
