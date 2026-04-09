import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ContractDetail from './ContractDetail.jsx'
import ServiceDetail from './ServiceDetail.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/contract-detail" element={<ContractDetail />} />
        <Route path="/service-detail" element={<ServiceDetail />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
