// app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Route Imports
const { router: authRouter } = require('./routes/auth');
const projectRoutes = require('./routes/projectRoutes');
const postRoutes = require('./routes/postRoutes');
const chatsRouter = require('./routes/chats');

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// API Routes
app.use('/api/auth', authRouter);        // Signup / Login / Verify
app.use('/api/projects', projectRoutes); // Protected Project CRUD
app.use('/api/posts', postRoutes);  

app.use('/api/chats', chatsRouter);     // Public Posts (with like/comment)

// Root Route for quick sanity check
app.get('/', (req, res) => {
  res.send('🚀 API is running. Welcome!');
});

// Launch Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
