const express = require('express');
const router = express.Router();
const Post = require('../model/Post');
const { verifyToken } = require('./auth');

// GET all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'name email')
      .populate('comments.user', 'name');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Fetch error', error: err.message });
  }
});

// Create new post (protected)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: 'Content required' });
    }

    const post = new Post({ user: req.user.id, content });
    await post.save();
    await post.populate('user', 'name');

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Create error', error: err.message });
  }
});

// Like/unlike post (protected)
router.post('/:id/like', verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.likes.includes(req.user.id)) {
      post.likes.pull(req.user.id);
    } else {
      post.likes.push(req.user.id);
    }

    await post.save();
    await post.populate('user', 'name');
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Like error', error: err.message });
  }
});

// Comment on post (protected)
router.post('/:id/comments', verifyToken, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: 'Comment required' });

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.comments.push({ user: req.user.id, text });
    await post.save();
    await post.populate('comments.user', 'name');

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Comment error', error: err.message });
  }
});

module.exports = router;
