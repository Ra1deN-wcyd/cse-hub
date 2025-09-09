import React, { useState } from "react";

const Internship = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const jobs = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "Tech Solutions Ltd.",
      location: "Dhaka, Bangladesh",
      type: "Internship",
      description: "Work on React-based projects and collaborate with the frontend team.",
      applyLink: "https://example.com/apply/frontend",
    },
    {
      id: 2,
      title: "Software Engineer",
      company: "InnovateX",
      location: "Remote",
      type: "Full-time",
      description: "Develop scalable software solutions for international clients.",
      applyLink: "https://example.com/apply/software",
    },
    {
      id: 3,
      title: "Data Analyst Intern",
      company: "DataWorks",
      location: "Chittagong, Bangladesh",
      type: "Internship",
      description: "Analyze datasets and create meaningful reports for clients.",
      applyLink: "https://example.com/apply/data",
    },
    {
      id: 4,
      title: "Backend Engineer",
      company: "NextGen IT",
      location: "Remote",
      type: "Full-time",
      description: "Design APIs and database systems for high-performance apps.",
      applyLink: "https://example.com/apply/backend",
    },
    {
      id: 5,
      title: "UI/UX Designer Intern",
      company: "DesignPro",
      location: "Dhaka, Bangladesh",
      type: "Internship",
      description: "Assist in creating user-friendly designs for mobile and web apps.",
      applyLink: "https://example.com/apply/uiux",
    },
    {
      id: 6,
      title: "AI Research Assistant",
      company: "FutureAI",
      location: "Remote",
      type: "Internship",
      description: "Help train and evaluate AI models for language understanding.",
      applyLink: "https://example.com/apply/ai",
    },
    {
      id: 7,
      title: "Cloud Engineer",
      company: "SkyNet Tech",
      location: "Dhaka, Bangladesh",
      type: "Full-time",
      description: "Manage cloud infrastructure (AWS, Azure, GCP).",
      applyLink: "https://example.com/apply/cloud",
    },
    {
      id: 8,
      title: "Mobile App Developer",
      company: "Appify",
      location: "Remote",
      type: "Full-time",
      description: "Develop Android/iOS apps using Flutter and React Native.",
      applyLink: "https://example.com/apply/mobile",
    },
    {
      id: 9,
      title: "Marketing Intern",
      company: "MarketWise",
      location: "Dhaka, Bangladesh",
      type: "Internship",
      description: "Assist with social media campaigns and marketing strategies.",
      applyLink: "https://example.com/apply/marketing",
    },
    {
      id: 10,
      title: "Cybersecurity Analyst",
      company: "SecureNet",
      location: "Remote",
      type: "Full-time",
      description: "Monitor and secure IT systems against cyber threats.",
      applyLink: "https://example.com/apply/cyber",
    },
  ];

  const openModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedJob(null);
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Application submitted for ${selectedJob.title}!`);
    closeModal();
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

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1400px', margin: '0 auto' }}>
        <h1
          style={{
            textAlign: 'center',
            fontSize: '3rem',
            fontWeight: '700',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          🚀 Internship & Job Opportunities
        </h1>
        <p
          style={{
            textAlign: 'center',
            color: '#a0a0a0',
            fontSize: '1.1rem',
            marginBottom: '3rem',
            lineHeight: '1.6'
          }}
        >
          Browse exciting internships and full-time jobs designed for students & graduates.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem'
          }}
        >
          {jobs.map((job) => (
            <div
              key={job.id}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '20px',
                padding: '2rem',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.boxShadow = '0 12px 40px 0 rgba(31, 38, 135, 0.5)';
                e.target.style.background = 'rgba(255, 255, 255, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.37)';
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              <h2
                style={{
                  color: '#fff',
                  fontSize: '1.4rem',
                  marginBottom: '1rem',
                  fontWeight: '600',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {job.title}
              </h2>
              <p style={{ color: '#a0a0a0', marginBottom: '0.5rem' }}>
                <strong style={{ color: '#fff' }}>🏢 {job.company}</strong>
              </p>
              <p style={{ color: '#a0a0a0', marginBottom: '1rem' }}>
                <strong style={{ color: '#fff' }}>📍 {job.location}</strong>
              </p>
              <span
                style={{
                  display: 'inline-block',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  background: job.type === "Internship" 
                    ? 'linear-gradient(135deg, #43e97b 0%, #38d9a9 100%)'
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: '#fff'
                }}
              >
                {job.type}
              </span>
              <p
                style={{
                  color: '#a0a0a0',
                  fontSize: '0.9rem',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem'
                }}
              >
                {job.description}
              </p>
              <button
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#fff',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                }}
                onClick={() => openModal(job)}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                }}
              >
                Apply Now ✨
              </button>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && selectedJob && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '2rem'
            }}
          >
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '20px',
                padding: '2rem',
                maxWidth: '500px',
                width: '100%',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
              }}
            >
              <h2
                style={{
                  color: '#fff',
                  fontSize: '1.5rem',
                  marginBottom: '1rem',
                  fontWeight: '600'
                }}
              >
                Apply for {selectedJob.title}
              </h2>
              <p style={{ color: '#a0a0a0', marginBottom: '1.5rem' }}>
                <strong style={{ color: '#fff' }}>Company:</strong> {selectedJob.company}
              </p>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                  <label
                    style={{
                      display: 'block',
                      color: '#fff',
                      marginBottom: '0.5rem',
                      fontWeight: '500'
                    }}
                  >
                    Full Name:
                  </label>
                  <input
                    type="text"
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: '2px solid rgba(255, 255, 255, 0.1)',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: '#fff',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label
                    style={{
                      display: 'block',
                      color: '#fff',
                      marginBottom: '0.5rem',
                      fontWeight: '500'
                    }}
                  >
                    Email:
                  </label>
                  <input
                    type="email"
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: '2px solid rgba(255, 255, 255, 0.1)',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: '#fff',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label
                    style={{
                      display: 'block',
                      color: '#fff',
                      marginBottom: '0.5rem',
                      fontWeight: '500'
                    }}
                  >
                    Resume Link (Google Drive/LinkedIn):
                  </label>
                  <input
                    type="url"
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: '2px solid rgba(255, 255, 255, 0.1)',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: '#fff',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button
                    type="submit"
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
                  >
                    Submit
                  </button>
                  <a
                    href={selectedJob.applyLink}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      color: '#fff',
                      textDecoration: 'none',
                      fontWeight: '600',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Apply via Company Website 🌐
                  </a>
                  <button
                    type="button"
                    onClick={closeModal}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: 'rgba(255, 107, 107, 0.2)',
                      border: '1px solid rgba(255, 107, 107, 0.3)',
                      borderRadius: '12px',
                      color: '#ff6b6b',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
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

export default Internship;
