import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Finds the root element in index.html and renders the App inside it.
// StrictMode adds extra development checks. The ! tells TypeScript the element exists.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
