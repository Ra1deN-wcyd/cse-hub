// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingPage';
import Login from './pages/login';
import RegisterPage from './pages/RegisterPage';
import Academic from './pages/Academic';
import Resources from './pages/Resources';
import Cp from './pages/Cp'; // ✅ Import Competitive Programming page

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/academic" element={<Academic />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/cp" element={<Cp />} /> {/* ✅ CP route added */}
      </Routes>
    </Router>
  );
};

export default App;
