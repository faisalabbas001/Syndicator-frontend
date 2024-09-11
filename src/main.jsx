import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AppKitProvider from './BlockChainContext/wagmi.jsx'
import { Toaster } from 'react-hot-toast'
import { HeaderProvider } from './HeaderContext/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppKitProvider>
      <HeaderProvider>
    <App />
   <Toaster position='top-right'/>
   </HeaderProvider>
    </AppKitProvider>
   </StrictMode>,
)
