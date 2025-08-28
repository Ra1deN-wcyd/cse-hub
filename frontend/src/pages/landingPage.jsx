import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user.name) setUserName(user.name);
      } catch (err) {
        console.error('Error parsing stored user:', err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserName('');
    alert('Logged out');
    navigate('/login');
  };

  return (
    <div className="landing-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/academic" className="nav-item">Academic</Link>
          <Link to="/cp" className="nav-item">Competitive Programming</Link>
          <Link to="/personal" className="nav-item">Personal Improvement</Link>
          <Link to="/projects" className="nav-item">Projects</Link>
          <Link to="/Growth" className="nav-item">Growth</Link>
          <Link to="/Internship" className="nav-item">Internship</Link>

          {/* Added margin-left style to create gap */}
          <Link to="/search" className="nav-item" style={{ marginLeft: '20px' }}>
            Search Users
          </Link>

          <span className="nav-item">Public Post</span>
          <span className="nav-item">Chat</span>
        </div>

        <div className="nav-right">
          {!userName ? (
            <>
              <span className="nav-link" onClick={() => navigate('/login')}>Login</span>
              <span className="nav-link" onClick={() => navigate('/register')}>Register</span>
            </>
          ) : (
            <>
              <span className="nav-link" onClick={() => navigate('/profile')}>Profile</span>
              <span className="nav-link logout" onClick={handleLogout}>Logout</span>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
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

      {/* Feature Section */}
      <div className="features">
        <div className="feature-box">
          <h3>Academic Excellence</h3>
          <p>Explore study materials, courses, and tutorials to excel in your academic journey.</p>
        </div>
        <div className="feature-box">
          <h3>Competitive Programming</h3>
          <p>Practice and participate in programming contests to sharpen your problem-solving skills.</p>
        </div>
        <div className="feature-box">
          <h3>Personal Improvement</h3>
          <p>Access resources and advice for personal growth and professional development.</p>
        </div>
        <div className="feature-box">
          <h3>Projects & Collaboration</h3>
          <p>Showcase your projects and collaborate with peers on innovative ideas.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
