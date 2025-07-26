// src/App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import RegisterPage from './pages/registerPage'  // 👈 Import added
import LandingPage from './pages/landingPage'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} /> {/* 👈 New route */}
        <Route path="/landingpage" element={<LandingPage />} />
      </Routes>
    </Router>
  )
}

export default App
