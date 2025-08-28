import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.name) setUserName(user.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUserName('');
    alert('Logged out');
    navigate('/login');
  };

  return (
    <div className="landing-container">
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/academic" className="nav-item">Academic</Link>
          <Link to="/cp" className="nav-item">Competitive Programming</Link>
          <Link to="/personal" className="nav-item">Personal Improvement</Link>
          <Link to="/projects" className="nav-item">Projects</Link>
          <Link to="/Growth" className="nav-item">Growth</Link>
          <Link to="/Internship" className="nav-item">Internship</Link>
          <span className="nav-item">Public Post</span>
          <span className="nav-item">Chat</span>
          <span className="nav-item">Personal Info</span>
        </div>
        <div className="nav-right">
          {!userName ? (
            <>
              <span className="nav-link" onClick={() => navigate('/login')}>Login</span>
              <span className="nav-link" onClick={() => navigate('/register')}>Register</span>
            </>
          ) : (
            <span className="nav-link logout" onClick={handleLogout}>Logout</span>
          )}
        </div>
      </nav>

      <div className="hero">
        {userName && (
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#ffffff',
            marginBottom: '12px',
            textAlign: 'center'
          }}>
            Hello, {userName}!
          </h2>
        )}
        <h1 className="hero-title">Welcome to the <span className="highlight">CSE Hub</span></h1>
        <p className="hero-subtitle">Your one-stop space for learning, projects, and collaboration.</p>
        <button className="get-started" onClick={() => navigate('/register')}>Get Started</button>
      </div>
    </div>
  );
};

export default LandingPage;
