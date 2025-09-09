import React, { useState } from "react";

const Growth = () => {
  const [skills, setSkills] = useState([
    { name: "React", level: 70 },
    { name: "JavaScript", level: 85 },
    { name: "C++", level: 60 },
    { name: "Python", level: 75 },
  ]);

  const addSkill = () => {
    const skillName = prompt("Enter skill name:");
    const skillLevel = prompt("Enter skill level (0-100):");
    if (skillName && skillLevel) {
      setSkills([...skills, { name: skillName, level: parseInt(skillLevel) }]);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
        padding: '2rem',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated Background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(240, 147, 251, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(79, 172, 254, 0.2) 0%, transparent 50%)
          `,
          animation: 'float 20s ease-in-out infinite'
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
        <h1
          style={{
            textAlign: 'center',
            fontSize: '3rem',
            fontWeight: '700',
            marginBottom: '3rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          📈 Growth & Development
        </h1>

        {/* ===== Portfolio Section ===== */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
          }}
        >
          <h2
            style={{
              color: '#fff',
              fontSize: '1.8rem',
              marginBottom: '1rem',
              fontWeight: '600'
            }}
          >
            📂 Portfolio
          </h2>
          <p
            style={{
              color: '#a0a0a0',
              marginBottom: '1.5rem',
              lineHeight: '1.6'
            }}
          >
            Showcase your projects, internships, GitHub repositories, designs, or
            articles. Build a professional presence online.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              style={{
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
              }}
              onClick={() => window.open("https://github.com/", "_blank")}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
              }}
            >
              🌐 Create GitHub Portfolio
            </button>
            <button
              style={{
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
              }}
              onClick={() => window.open("https://www.behance.net/", "_blank")}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
              }}
            >
              🎨 Create Design Portfolio
            </button>
          </div>
        </div>

        {/* ===== Resume Section ===== */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
          }}
        >
          <h2
            style={{
              color: '#fff',
              fontSize: '1.8rem',
              marginBottom: '1rem',
              fontWeight: '600'
            }}
          >
            📄 Resume / CV Builder
          </h2>
          <p
            style={{
              color: '#a0a0a0',
              marginBottom: '1.5rem',
              lineHeight: '1.6'
            }}
          >
            Keep your resume always up-to-date with your projects and skills. Use
            online builders to generate professional resumes.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              style={{
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
              }}
              onClick={() =>
                window.open("https://www.canva.com/resumes/templates/", "_blank")
              }
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
              }}
            >
              📌 Build Resume on Canva
            </button>
            <button
              style={{
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
              }}
              onClick={() =>
                window.open("https://novoresume.com/resume-builder", "_blank")
              }
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
              }}
            >
              ⚡ Build Resume on Novoresume
            </button>
          </div>
        </div>

        {/* ===== Skill Tracker Section ===== */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
          }}
        >
          <h2
            style={{
              color: '#fff',
              fontSize: '1.8rem',
              marginBottom: '1rem',
              fontWeight: '600'
            }}
          >
            📊 Skill Tracker
          </h2>
          <p
            style={{
              color: '#a0a0a0',
              marginBottom: '1.5rem',
              lineHeight: '1.6'
            }}
          >
            Log your progress and track improvement over time.
          </p>

          {skills.map((skill, index) => (
            <div
              key={index}
              style={{
                marginBottom: '1.5rem'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem'
                }}
              >
                <span
                  style={{
                    color: '#fff',
                    fontWeight: '500'
                  }}
                >
                  {skill.name}
                </span>
                <span
                  style={{
                    color: '#a0a0a0',
                    fontWeight: '500'
                  }}
                >
                  {skill.level}%
                </span>
              </div>
              <div
                style={{
                  width: '100%',
                  height: '8px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    width: `${skill.level}%`,
                    height: '100%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '4px',
                    transition: 'width 0.3s ease'
                  }}
                />
              </div>
            </div>
          ))}

          <button
            style={{
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
            }}
            onClick={addSkill}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
            }}
          >
            ➕ Add New Skill
          </button>
        </div>

        {/* ===== Certifications Section ===== */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
          }}
        >
          <h2
            style={{
              color: '#fff',
              fontSize: '1.8rem',
              marginBottom: '1rem',
              fontWeight: '600'
            }}
          >
            🎓 Certifications
          </h2>
          <p
            style={{
              color: '#a0a0a0',
              marginBottom: '1.5rem',
              lineHeight: '1.6'
            }}
          >
            Showcase verified achievements and online courses.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}
          >
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '1.5rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(102, 126, 234, 0.1)';
                e.target.style.borderColor = 'rgba(102, 126, 234, 0.3)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <h3
                style={{
                  color: '#fff',
                  fontSize: '1.2rem',
                  marginBottom: '0.5rem',
                  fontWeight: '600'
                }}
              >
                Coursera
              </h3>
              <p
                style={{
                  color: '#a0a0a0',
                  fontSize: '0.9rem',
                  lineHeight: '1.6',
                  margin: 0
                }}
              >
                Completed courses in Machine Learning & Web Development.
              </p>
            </div>
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '1.5rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(102, 126, 234, 0.1)';
                e.target.style.borderColor = 'rgba(102, 126, 234, 0.3)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <h3
                style={{
                  color: '#fff',
                  fontSize: '1.2rem',
                  marginBottom: '0.5rem',
                  fontWeight: '600'
                }}
              >
                Udemy
              </h3>
              <p
                style={{
                  color: '#a0a0a0',
                  fontSize: '0.9rem',
                  lineHeight: '1.6',
                  margin: 0
                }}
              >
                Certified in JavaScript, React, and Backend Development.
              </p>
            </div>
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '1.5rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(102, 126, 234, 0.1)';
                e.target.style.borderColor = 'rgba(102, 126, 234, 0.3)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <h3
                style={{
                  color: '#fff',
                  fontSize: '1.2rem',
                  marginBottom: '0.5rem',
                  fontWeight: '600'
                }}
              >
                Hackerrank
              </h3>
              <p
                style={{
                  color: '#a0a0a0',
                  fontSize: '0.9rem',
                  lineHeight: '1.6',
                  margin: 0
                }}
              >
                Problem-solving and coding challenges certificates.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default Growth;
