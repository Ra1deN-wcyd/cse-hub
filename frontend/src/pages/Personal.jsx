import React from 'react';

const skillAreas = [
  { name: "Time Management", resource: "https://www.mindtools.com/pages/main/newMN_HTE.htm" },
  { name: "Communication Skills", resource: "https://www.coursera.org/courses?query=communication%20skills" },
  { name: "Leadership", resource: "https://www.edx.org/course/leadership-and-influence" },
  { name: "Critical Thinking", resource: "https://www.edx.org/course/critical-thinking-skills-for-university-success" },
  { name: "Teamwork", resource: "https://www.futurelearn.com/courses/teamwork-skills" },
  { name: "Stress Management", resource: "https://www.helpguide.org/articles/stress/stress-management.htm" },
  { name: "Problem Solving", resource: "https://www.futurelearn.com/courses/problem-solving" },
  { name: "Public Speaking", resource: "https://www.toastmasters.org/find-a-club" },
  { name: "Personal Finance", resource: "https://www.khanacademy.org/college-careers-more/personal-finance" },
  { name: "Career Building", resource: "https://www.linkedin.com/learning/" }
];

const habits = [
  "📝 Daily Journaling – Reflect on what you learned and set small goals.",
  "⏳ Use the Pomodoro Technique – Study in 25-min focus sessions with 5-min breaks.",
  "🏃 Regular Exercise – Even 20 mins a day boosts focus & energy.",
  "📖 Read at least 20 minutes a day – Books, research papers, or blogs.",
  "🎯 Set Weekly Goals – Break down big tasks into achievable steps.",
  "🤝 Networking – Connect with seniors, teachers, and professionals.",
  "🌍 Stay Updated – Follow tech news, AI, software trends, and global issues.",
  "🧠 Practice Mindfulness – Meditation or breathing exercises to reduce stress.",
  "💻 Build Side Projects – Apply your learning in real projects.",
  "📂 Organize Notes – Use Notion, OneNote, or Google Keep.",
  "💡 Learn Soft Skills – Communication, teamwork, adaptability.",
  "📊 Track Progress – Use a planner or app to measure growth.",
  "🌱 Volunteer – Join social work or tech communities.",
  "📢 Attend Seminars & Webinars – Learn beyond textbooks.",
  "🌐 Improve English – Practice writing, speaking, and presentations.",
  "💼 Internships – Gain real-world experience early.",
  "💵 Learn Financial Literacy – Budget, save, and plan expenses.",
  "💤 Sleep Well – 7–8 hrs of sleep for productivity and memory retention."
];

const Personal = () => {
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
          🌱 Personal Improvement
        </h1>

        {/* Section: Skill Development */}
        <section
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            padding: '2rem',
            marginBottom: '3rem',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
          }}
        >
          <h2
            style={{
              color: '#fff',
              fontSize: '1.8rem',
              marginBottom: '1.5rem',
              fontWeight: '600'
            }}
          >
            Skill Development Resources
          </h2>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem'
            }}
          >
            {skillAreas.map((skill, index) => (
              <li key={index}>
                <a
                  href={skill.resource}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    padding: '1rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    textAlign: 'center'
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
                  {skill.name}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Section: Productive Habits */}
        <h2
          style={{
            color: '#fff',
            fontSize: '2rem',
            textAlign: 'center',
            marginBottom: '2rem',
            fontWeight: '600'
          }}
        >
          ✅ Recommended Things for Students
        </h2>
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
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '1rem'
            }}
          >
            {habits.map((habit, i) => (
              <li
                key={i}
                style={{
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: '#a0a0a0',
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(102, 126, 234, 0.1)';
                  e.target.style.color = '#fff';
                  e.target.style.borderColor = 'rgba(102, 126, 234, 0.3)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.target.style.color = '#a0a0a0';
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                {habit}
              </li>
            ))}
          </ul>
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

export default Personal;
