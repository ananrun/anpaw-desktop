import { HashRouter, Route, Routes } from 'react-router-dom'
import BrowserPage from './pages/BrowserPage'
import HomePage from './pages/HomePage'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/browser" element={<BrowserPage />} />
      </Routes>
    </HashRouter>
  )
}
