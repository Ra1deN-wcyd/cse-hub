import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    // Create floating particles
    const createParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 4 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
      setParticles(newParticles);
    };

    createParticles();

    // Animate particles
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.speedX,
        y: particle.y + particle.speedY,
        x: particle.x > window.innerWidth ? 0 : particle.x < 0 ? window.innerWidth : particle.x,
        y: particle.y > window.innerHeight ? 0 : particle.y < 0 ? window.innerHeight : particle.y
      })));
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserName('');
    alert('Logged out');
    navigate('/login');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
      }}
    >
      {/* Animated Background Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          style={{
            position: 'absolute',
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            background: 'rgba(102, 126, 234, 0.6)',
            borderRadius: '50%',
            opacity: particle.opacity,
            pointerEvents: 'none',
            animation: 'float 6s ease-in-out infinite',
            animationDelay: `${particle.id * 0.1}s`
          }}
        />
      ))}

      {/* Dynamic Gradient Orbs */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite',
          filter: 'blur(40px)'
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '60%',
          right: '10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(240, 147, 251, 0.3) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 10s ease-in-out infinite reverse',
          filter: 'blur(50px)'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '50%',
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(79, 172, 254, 0.3) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 12s ease-in-out infinite',
          filter: 'blur(30px)'
        }}
      />

      {/* Mouse Follower Effect */}
      <div
        style={{
          position: 'fixed',
          left: mousePosition.x - 15,
          top: mousePosition.y - 15,
          width: '30px',
          height: '30px',
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 1000,
          transition: 'all 0.1s ease-out',
          filter: 'blur(20px)'
        }}
      />

      {/* Modern Navigation Bar */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: isScrolled 
            ? 'rgba(255, 255, 255, 0.1)' 
            : 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'all 0.3s ease',
          padding: '1rem 0'
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Link 
            to="/" 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none',
              color: '#fff',
              fontSize: '1.5rem',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
            }}
          >
            <span style={{ fontSize: '2rem', animation: 'float 3s ease-in-out infinite' }}>🎓</span>
            <span>CSE Hub</span>
          </Link>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            {['Academic', 'CP', 'Growth', 'Projects', 'Analytics', 'Internship', 'Search'].map((item, index) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                style={{
                  padding: '0.5rem 1rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(102, 126, 234, 0.2)';
                  e.target.style.borderColor = 'rgba(102, 126, 234, 0.5)';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                {item}
              </Link>
            ))}

            <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}>
              {!userName ? (
                <>
                  <button
                    onClick={() => navigate('/login')}
                    style={{
                      padding: '0.5rem 1rem',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    🔑 Login
                  </button>
                  <button
                    onClick={() => navigate('/register')}
                    style={{
                      padding: '0.5rem 1rem',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                    }}
                  >
                    ✨ Register
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/profile')}
                    style={{
                      padding: '0.5rem 1rem',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    👤 Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    style={{
                      padding: '0.5rem 1rem',
                      background: 'rgba(255, 107, 107, 0.2)',
                      border: '1px solid rgba(255, 107, 107, 0.3)',
                      borderRadius: '12px',
                      color: '#ff6b6b',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    🚪 Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          position: 'relative',
          zIndex: 1
        }}
      >
        <div
          style={{
            textAlign: 'center',
            maxWidth: '800px',
            animation: 'fadeInUp 1s ease-out'
          }}
        >
          {userName && (
            <h2
              style={{
                fontSize: '1.5rem',
                color: '#a0a0a0',
                marginBottom: '1rem',
                animation: 'fadeInLeft 1s ease-out 0.2s both'
              }}
            >
              Hello, {userName}! 👋
            </h2>
          )}
          <h1
            style={{
              fontSize: '4rem',
              fontWeight: '800',
              marginBottom: '1.5rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'fadeInUp 1s ease-out 0.4s both'
            }}
          >
            Welcome to the <span style={{ color: '#43e97b' }}>CSE Hub</span>
          </h1>
          <p
            style={{
              fontSize: '1.2rem',
              color: '#a0a0a0',
              lineHeight: '1.6',
              marginBottom: '2.5rem',
              animation: 'fadeInUp 1s ease-out 0.6s both'
            }}
          >
            Your comprehensive platform for academic excellence, competitive programming, 
            and professional growth in Computer Science Engineering.
          </p>
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              animation: 'fadeInUp 1s ease-out 0.8s both'
            }}
          >
            <button
              onClick={() => navigate('/register')}
              style={{
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '16px',
                color: '#fff',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
              }}
            >
              🚀 Get Started
            </button>
            <button
              onClick={() => navigate('/academic')}
              style={{
                padding: '1rem 2rem',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '16px',
                color: '#fff',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 8px 25px rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              📖 Explore Features
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div
        style={{
          padding: '4rem 2rem',
          position: 'relative',
          zIndex: 1
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto'
          }}
        >
          <h2
            style={{
              textAlign: 'center',
              fontSize: '3rem',
              fontWeight: '700',
              marginBottom: '3rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'fadeInUp 1s ease-out'
            }}
          >
            Why Choose CSE Hub?
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '2rem'
            }}
          >
            {[
              {
                icon: '📚',
                title: 'Academic Excellence',
                description: 'Access curated study materials, courses, and tutorials designed to help you excel in your academic journey and master complex CS concepts.'
              },
              {
                icon: '💻',
                title: 'Competitive Programming',
                description: 'Practice with real contest problems, track your progress, and compete with peers to sharpen your algorithmic problem-solving skills.'
              },
              {
                icon: '🚀',
                title: 'Personal Development',
                description: 'Discover resources for personal growth, career guidance, and professional development to build a successful tech career.'
              },
              {
                icon: '🛠️',
                title: 'Projects & Collaboration',
                description: 'Showcase your innovative projects, collaborate with talented peers, and build a portfolio that stands out to employers.'
              },
              {
                icon: '📈',
                title: 'Growth Tracking',
                description: 'Monitor your learning progress, set goals, and track your achievements across different areas of computer science.'
              },
              {
                icon: '💼',
                title: 'Internship Opportunities',
                description: 'Connect with industry opportunities, get internship guidance, and prepare for your transition into the professional world.'
              }
            ].map((feature, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '20px',
                  padding: '2rem',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  animation: `fadeInUp 1s ease-out ${0.1 * index}s both`,
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-10px)';
                  e.target.style.boxShadow = '0 20px 40px rgba(31, 38, 135, 0.5)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <div
                  style={{
                    fontSize: '3rem',
                    marginBottom: '1rem',
                    animation: 'float 3s ease-in-out infinite',
                    animationDelay: `${index * 0.2}s`
                  }}
                >
                  {feature.icon}
                </div>
                <h3
                  style={{
                    color: '#fff',
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    color: '#a0a0a0',
                    lineHeight: '1.6',
                    fontSize: '1rem'
                  }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
