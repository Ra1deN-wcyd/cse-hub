import React, { useState } from 'react';

const UserSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setMessage('');
    setLoading(true);
    setUsers([]);

    try {
      const res = await fetch(`http://localhost:5000/api/auth/search?name=${searchTerm}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) {
        if (data.users.length === 0) {
          setMessage('No users found.');
        } else {
          setUsers(data.users);
        }
      } else {
        setMessage(data.message || 'Error searching users.');
      }
    } catch (err) {
      setMessage('Something went wrong.');
    }

    setLoading(false);
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

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
        <h2
          style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '2rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          🔍 User Search
        </h2>

        <form
          onSubmit={handleSearch}
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
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Enter user name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                padding: '0.75rem',
                borderRadius: '12px',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: '#fff',
                fontSize: '1rem',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(102, 126, 234, 0.5)';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                e.target.style.boxShadow = 'none';
              }}
            />
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
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                whiteSpace: 'nowrap'
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
              Search
            </button>
          </div>
        </form>

        {loading && (
          <div
            style={{
              textAlign: 'center',
              padding: '2rem',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
              marginBottom: '2rem'
            }}
          >
            <p style={{ color: '#fff', fontSize: '1.2rem' }}>Loading...</p>
          </div>
        )}

        {message && (
          <div
            style={{
              marginBottom: '2rem',
              padding: '1rem',
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 107, 107, 0.1)',
              border: '1px solid rgba(255, 107, 107, 0.3)',
              color: '#ff6b6b',
              textAlign: 'center',
              fontWeight: '500'
            }}
          >
            {message}
          </div>
        )}

        {users.length > 0 && (
          <div
            style={{
              display: 'grid',
              gap: '1.5rem'
            }}
          >
            {users.map((user) => (
              <div
                key={user._id}
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
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 12px 40px 0 rgba(31, 38, 135, 0.5)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.37)';
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <h3
                  style={{
                    color: '#fff',
                    fontSize: '1.3rem',
                    marginBottom: '1rem',
                    fontWeight: '600',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {user.name}
                </h3>
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                  <p style={{ color: '#a0a0a0', margin: 0 }}>
                    <strong style={{ color: '#fff' }}>📧 Email:</strong> {user.email}
                  </p>
                  <p style={{ color: '#a0a0a0', margin: 0 }}>
                    <strong style={{ color: '#fff' }}>🏫 University:</strong> {user.university || 'N/A'}
                  </p>
                  <p style={{ color: '#a0a0a0', margin: 0 }}>
                    <strong style={{ color: '#fff' }}>💻 GitHub:</strong>{' '}
                    {user.githubLink ? (
                      <a
                        href={user.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          color: '#667eea',
                          textDecoration: 'none',
                          fontWeight: '500'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.textDecoration = 'underline';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.textDecoration = 'none';
                        }}
                      >
                        {user.githubLink}
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </p>
                </div>
              </div>
            ))}
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

export default UserSearch;
