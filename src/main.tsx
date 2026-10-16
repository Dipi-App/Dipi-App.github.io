import '@fontsource/vazirmatn/arabic-400.css'
import '@fontsource/vazirmatn/arabic-700.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './motion/tokens.css'
import './index.css'

const rootElement = document.getElementById('root')

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
