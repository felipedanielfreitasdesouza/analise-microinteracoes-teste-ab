import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import inlineStyles from './index.css?inline'
import App from './App.jsx'
import { initializeAnalytics } from './services/analytics.js'

function installInlineStyles() {
  if (typeof document === 'undefined' || document.querySelector('[data-tcc-inline-styles]')) {
    return
  }

  const style = document.createElement('style')
  style.dataset.tccInlineStyles = 'true'
  style.textContent = inlineStyles
  document.head.appendChild(style)
}

installInlineStyles()
initializeAnalytics()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
