import React from 'react';

const universities = [
  { name: "BUET", url: "https://cse.buet.ac.bd/academics/ug_courses" },
  { name: "AUST", url: "https://www.aust.edu/cse/syllabus" },
  { name: "KUET", url: "https://old.kuet.ac.bd/department/CSE/index.php/welcome/syllabus" },
  { name: "RUET", url: "https://www.cse.ruet.ac.bd/page/course-curriculum" },
  { name: "CUET", url: "https://cuet.ac.bd" },
  { name: "IUT", url: "https://www.iutoic-dhaka.edu" },
  { name: "NSU", url: "https://www.northsouth.edu/academic/undergraduate-programs/cse.html" },
  { name: "BRACU", url: "https://www.bracu.ac.bd/academics/departments/computer-science-and-engineering" },
  { name: "JU", url: "https://juniv.edu/department/cse" },
  { name: "DU (IIT)", url: "https://iit.du.ac.bd" }
];

const semesterCourses = {
  "1st Semester": [
    "Structured Programming / C",
    "Discrete Mathematics",
    "Calculus / Differential Calculus",
    "Physics",
    "English / Communication"
  ],
  "2nd Semester": [
    "Object-Oriented Programming (OOP)",
    "Digital Logic Design",
    "Linear Algebra / Coordinate Geometry",
    "Basic Electrical Engineering",
    "Chemistry / Environment"
  ],
  "3rd Semester": [
    "Data Structures & Algorithms I",
    "Computer Architecture",
    "Database Systems",
    "Differential Equations",
    "Numerical Methods"
  ],
  "4th Semester": [
    "Data Structures & Algorithms II",
    "Theory of Computation / Automata",
    "Operating Systems (Intro)",
    "Statistics",
    "Software Engineering (Intro)"
  ]
};

const Academic = () => {
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
          🎓 Academic Information
        </h1>

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
            CSE Syllabus of the Top Universities in Bangladesh
          </h2>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem'
            }}
          >
            {universities.map((uni, index) => (
              <li key={index}>
                <a
                  href={uni.url}
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
                  {uni.name}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <h2
          style={{
            color: '#fff',
            fontSize: '2rem',
            textAlign: 'center',
            marginBottom: '2rem',
            fontWeight: '600'
          }}
        >
          Common CSE Core Courses by Semester
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}
        >
          {Object.entries(semesterCourses).map(([semester, courses], index) => (
            <div
              key={index}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '16px',
                padding: '1.5rem',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.boxShadow = '0 12px 40px 0 rgba(31, 38, 135, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.37)';
              }}
            >
              <h3
                style={{
                  color: '#fff',
                  fontSize: '1.3rem',
                  marginBottom: '1rem',
                  fontWeight: '600',
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {semester}
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}
              >
                {courses.map((course, i) => (
                  <li
                    key={i}
                    style={{
                      padding: '0.75rem',
                      marginBottom: '0.5rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      color: '#a0a0a0',
                      fontSize: '0.9rem',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(102, 126, 234, 0.1)';
                      e.target.style.color = '#fff';
                      e.target.style.borderColor = 'rgba(102, 126, 234, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                      e.target.style.color = '#a0a0a0';
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                  >
                    {course}
                  </li>
                ))}
              </ul>
            </div>
          ))}
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

export default Academic;