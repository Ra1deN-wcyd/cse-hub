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
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h2>User Search</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter user name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '0.5rem', width: '80%' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem', marginLeft: '0.5rem' }}>
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {message && <p>{message}</p>}

      <ul>
        {users.map((user) => (
          <li key={user._id} style={{ marginBottom: '1rem' }}>
            <strong>{user.name}</strong> <br />
            Email: {user.email} <br />
            University: {user.university || 'N/A'} <br />
            GitHub: {user.githubLink ? (
              <a href={user.githubLink} target="_blank" rel="noreferrer">{user.githubLink}</a>
            ) : 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSearch;
