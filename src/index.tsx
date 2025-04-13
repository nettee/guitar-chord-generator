import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import './i18n'
import App from '@/App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)