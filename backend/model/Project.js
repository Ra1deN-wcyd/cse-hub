// model/Project.js
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now }
}, { _id: true });

const ProjectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  githubLink: { type: String, trim: true },
  techStack: { type: [String], default: [] },
  // new: comments subdocuments
  comments: { type: [CommentSchema], default: [] },
  // new: interested users (store user ids to ensure unique interest and easy count)
  interested: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
