// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingPage';
import Login from './pages/login';
import RegisterPage from './pages/RegisterPage';
import Academic from './pages/Academic';
import Resources from './pages/Resources';
import Cp from './pages/Cp';
import Personal from './pages/Personal';
import Projects from './pages/Projects'; 
import Growth from './pages/Growth';
import Internship from './pages/Internship';
import Profile from './pages/Profile';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/academic" element={<Academic />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/cp" element={<Cp />} />
        <Route path="/personal" element={<Personal />} />
        <Route path="/projects" element={<Projects />} /> 
        <Route path="/Growth" element={<Growth />} /> 
        <Route path="/Internship" element={<Internship />} /> 
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
