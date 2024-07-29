import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { LoadingProvider } from './store/LoadingContext.jsx'
import { NavProvider } from './store/NavContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <NavProvider>
    <LoadingProvider>
    <App />
  </LoadingProvider>
  </NavProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
