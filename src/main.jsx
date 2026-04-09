import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import ServiceDetail from './ServiceDetail.jsx'
import ContractDetail from './ContractDetail.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router basename="/project-detail-prototype">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/service-detail" element={<ServiceDetail />} />
        <Route path="/contract-detail" element={<ContractDetail />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
