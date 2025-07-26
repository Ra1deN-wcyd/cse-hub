import React from 'react'
import { useNavigate } from 'react-router-dom'
import './LandingPage.css' // 👈 Add this line to import the CSS

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <div className="landing-container">
      {/* Nav Bar */}
      <nav className="navbar">
        <div className="nav-left">
          {[
            'Academic',
            'Personal Improvement',
            'Projects',
            'Competitive Programming',
            'Public Post',
            'Chat',
            'Personal Info'
          ].map((item, index) => (
            <span key={index} className="nav-item">{item}</span>
          ))}
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
        <div className="feature-box">
          <img src="https://img.icons8.com/fluency/96/book.png" alt="Academic" />
          <h3>Academic Resources</h3>
          <p>Get notes, tutorials, and support for your academic journey.</p>
        </div>
        <div className="feature-box">
          <img src="https://img.icons8.com/fluency/96/idea.png" alt="Projects" />
          <h3>Projects & Ideas</h3>
          <p>Work on collaborative or personal projects that stand out.</p>
        </div>
        <div className="feature-box">
          <img src="https://img.icons8.com/fluency/96/group-chat.png" alt="Chat" />
          <h3>Connect & Chat</h3>
          <p>Share insights and ask for help in your community.</p>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
