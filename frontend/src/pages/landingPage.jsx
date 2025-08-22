import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* Nav Bar */}
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/academic" className="nav-item">Academic</Link>
          <Link to="/cp" className="nav-item">Competitive Programming</Link>
          <Link to="/personal" className="nav-item">Personal Improvement</Link>
          <Link to="/projects" className="nav-item">Projects</Link>
           
          <span className="nav-item">Public Post</span>
          <span className="nav-item">Chat</span>
          <span className="nav-item">Personal Info</span>
          
        </div>

        <div className="nav-right">
          <span className="nav-link" onClick={() => navigate('/login')}>Login</span>
          <span className="nav-link" onClick={() => navigate('/register')}>Register</span>
          <span className="nav-link logout" onClick={() => alert('Logged out (placeholder)')}>Logout</span>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero">
        <h1 className="hero-title">Welcome to the <span className="highlight">CSE Hub</span></h1>
        <p className="hero-subtitle">Your one-stop space for learning, projects, and collaboration.</p>
        <button className="get-started" onClick={() => navigate('/register')}>Get Started</button>
      </div>

      {/* Feature Section */}
      <div className="features">
        <div className="feature-box" onClick={() => navigate('/resources')}>
          <img src="https://img.icons8.com/fluency/96/book.png" alt="Academic" />
          <h3>Academic Resources</h3>
          <p>Get notes, tutorials, and support for your academic journey.</p>
        </div>
        <div className="feature-box" onClick={() => navigate('/personal')}>
          <img src="https://img.icons8.com/fluency/96/idea.png" alt="Personal" />
          <h3>Personal Improvement</h3>
          <p>Enhance your skills, habits, and mindset for success.</p>
        </div>
        <div className="feature-box" onClick={() => navigate('/projects')}>
          <img src="https://img.icons8.com/fluency/96/project.png" alt="Projects" />
          <h3>Projects & Ideas</h3>
          <p>Work on exciting projects and build your portfolio.</p>
        </div>
        <div className="feature-box">
          <img src="https://img.icons8.com/fluency/96/group-chat.png" alt="Chat" />
          <h3>Connect & Chat</h3>
          <p>Share insights and ask for help in your community.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
