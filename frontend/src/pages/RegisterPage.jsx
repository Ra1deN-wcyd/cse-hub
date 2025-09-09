import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // Save token and user info in localStorage for auto-login
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        setSuccessMessage('Registration successful! Redirecting to landing page...');

        setTimeout(() => {
          navigate('/'); // Redirect to landing page
        }, 1500);
      } else {
        setErrorMessage(data.message || 'Registration failed');
      }
    } catch (error) {
      setErrorMessage('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
      
      <form
        onSubmit={handleRegister}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          width: '100%',
          maxWidth: '400px',
          color: '#fff',
          position: 'relative',
          zIndex: 1
        }}
      >
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontSize: '2rem',
          fontWeight: '700'
        }}>✨ Register</h2>

        <label style={{
          color: '#a0a0a0',
          fontWeight: '500',
          fontSize: '0.875rem',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          display: 'block',
          marginBottom: '0.5rem'
        }}>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '0.5rem',
            marginBottom: '1rem',
            borderRadius: '6px',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            color: '#fff',
            backdropFilter: 'blur(10px)',
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
          required
        />

        <label style={{
          color: '#a0a0a0',
          fontWeight: '500',
          fontSize: '0.875rem',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          display: 'block',
          marginBottom: '0.5rem'
        }}>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '0.5rem',
            marginBottom: '1rem',
            borderRadius: '6px',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            color: '#fff',
            backdropFilter: 'blur(10px)',
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
          required
        />

        <label style={{
          color: '#a0a0a0',
          fontWeight: '500',
          fontSize: '0.875rem',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          display: 'block',
          marginBottom: '0.5rem'
        }}>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '0.5rem',
            marginBottom: '1rem',
            borderRadius: '6px',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            color: '#fff',
            backdropFilter: 'blur(10px)',
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
          required
          minLength={2}
        />

        <button 
          type="submit" 
          style={{
            width: '100%',
            padding: '0.75rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: '6px',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            if (!isLoading) {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isLoading) {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
            }
          }}
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : '🚀 Register'}
        </button>

        {successMessage && (
          <p style={{ 
            color: '#43e97b', 
            marginTop: '1rem',
            backgroundColor: 'rgba(67, 233, 123, 0.1)',
            border: '1px solid rgba(67, 233, 123, 0.3)',
            padding: '0.75rem',
            borderRadius: '8px',
            textAlign: 'center',
            fontWeight: '500'
          }}>
            {successMessage}
          </p>
        )}
        {errorMessage && (
          <p style={{ 
            color: '#ff6b6b', 
            marginTop: '1rem',
            backgroundColor: 'rgba(255, 107, 107, 0.1)',
            border: '1px solid rgba(255, 107, 107, 0.3)',
            padding: '0.75rem',
            borderRadius: '8px',
            textAlign: 'center',
            fontWeight: '500'
          }}>
            {errorMessage}
          </p>
        )}
      </form>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;
