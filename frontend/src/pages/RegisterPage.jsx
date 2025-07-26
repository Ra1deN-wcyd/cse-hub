import React, { useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      setSuccess('✅ Registered successfully!');
      setFormData({ name: '', email: '', password: '' });
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong');
      }
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(to right, #6a11cb, #2575fc)',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: '#1f1f2e',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          width: '100%',
          maxWidth: '400px',
          color: '#fff'
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Register</h2>

        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>Register</button>

        {success && <p style={{ color: 'limegreen', marginTop: '1rem' }}>{success}</p>}
        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
      </form>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '0.5rem',
  marginBottom: '1rem',
  borderRadius: '6px',
  border: '1px solid #444',
  backgroundColor: '#2c2c3a',
  color: '#fff'
};

const buttonStyle = {
  width: '100%',
  padding: '0.75rem',
  backgroundColor: '#a46cf5',
  border: 'none',
  borderRadius: '6px',
  color: '#fff',
  fontWeight: 'bold',
  cursor: 'pointer'
};

export default RegisterPage;
