import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: 'hsl(220, 15%, 15%)',
            color: 'hsl(220, 10%, 90%)',
            border: '1px solid hsl(220, 15%, 25%)',
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>,
)