import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [university, setUniversity] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (res.ok) {
          setName(data.user.name || '');
          setEmail(data.user.email || '');
          setUniversity(data.user.university || '');
          setGithubLink(data.user.githubLink || '');
        } else {
          setMessage(data.message || 'Failed to load profile');
        }
      } catch (error) {
        setMessage('Something went wrong');
        console.error(error);
      }
      setLoading(false);
    };

    fetchProfile();
  }, [navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage('');
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, university, githubLink }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ Profile updated successfully!');
        const user = JSON.parse(localStorage.getItem('user')) || {};
        user.name = data.user.name;
        user.university = data.user.university;
        user.githubLink = data.user.githubLink;
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        setMessage(data.message || 'Update failed');
      }
    } catch (error) {
      setMessage('Something went wrong');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      {message && <p className="profile-message">{message}</p>}

      {loading ? (
        <p className="profile-loading">Loading...</p>
      ) : (
        <form onSubmit={handleUpdate} className="profile-form">
          <div className="profile-field">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="profile-field">
            <label>Email (read-only):</label>
            <input type="email" value={email} readOnly />
          </div>

          <div className="profile-field">
            <label>University:</label>
            <input
              type="text"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
            />
          </div>

          <div className="profile-field">
            <label>GitHub Link:</label>
            <input
              type="url"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
              placeholder="https://github.com/username"
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Profile;
