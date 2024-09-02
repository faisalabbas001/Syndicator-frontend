import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AppKitProvider from './BlockChainContext/wagmi.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppKitProvider>
    <App />
    </AppKitProvider>
  </StrictMode>,
)
