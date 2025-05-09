import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "highlight.js/styles/tokyo-night-dark.css";
import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
