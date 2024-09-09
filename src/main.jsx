import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AppKitProvider from './BlockChainContext/wagmi.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppKitProvider>
    <App />
   <Toaster position='top-right'/>
    </AppKitProvider>
   </StrictMode>,
)
