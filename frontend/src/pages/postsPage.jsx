import React, { useEffect, useState } from 'react';
import './PostsPage.css';

const API_BASE = 'http://localhost:5000/api/posts';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [commentInputs, setCommentInputs] = useState({});
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(API_BASE)
      .then(res => res.json())
      .then(setPosts)
      .catch(err => setError('Failed to load posts'));
  }, []);

  const handlePost = async () => {
    if (!newPost.trim()) {
      setError('Post cannot be empty');
      return;
    }
    if (!token) {
      setError('Login required');
      return;
    }

    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newPost }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setPosts([data, ...posts]);
      setNewPost('');
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLike = async id => {
    if (!token) {
      setError('Login required');
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/${id}/like`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const updated = await res.json();
      if (!res.ok) throw new Error(updated.message);
      setPosts(prev => prev.map(p => (p._id === updated._id ? updated : p)));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleComment = async postId => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;
    if (!token) {
      setError('Login required');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
      });
      const updated = await res.json();
      if (!res.ok) throw new Error(updated.message);
      setPosts(prev => prev.map(p => (p._id === updated._id ? updated : p)));
      setCommentInputs(prev => ({ ...prev, [postId]: '' }));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="posts-container">
      <h1>Posts</h1>
      {error && <div className="error">{error}</div>}
      <div className="create-post">
        <textarea
          placeholder="What's on your mind?"
          value={newPost}
          onChange={e => setNewPost(e.target.value)}
        />
        <button onClick={handlePost}>Post</button>
      </div>
      <div className="post-feed">
        {posts.length === 0 ? (
          <p>No posts yet. Be the first!</p>
        ) : (
          posts.map(post => (
            <div className="post-card" key={post._id}>
              <p><strong>{post.user?.name || 'Anonymous'}</strong></p>
              <p>{post.content}</p>
              <button onClick={() => handleLike(post._id)}>
                👍 Like ({post.likes.length})
              </button>
              <div className="comment-section">
                <input
                  type="text"
                  placeholder="Write a comment"
                  value={commentInputs[post._id] || ''}
                  onChange={e =>
                    setCommentInputs({
                      ...commentInputs,
                      [post._id]: e.target.value,
                    })
                  }
                />
                <button onClick={() => handleComment(post._id)}>Comment</button>
              </div>
              <ul className="comment-list">
                {post.comments.map((c, idx) => (
                  <li key={idx}>
                    <strong>{c.user?.name || 'Anonymous'}</strong>: {c.text}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PostsPage;
