// model/Conversation.js
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now },
  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { _id: true });

const ConversationSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  messages: { type: [MessageSchema], default: [] }
}, { timestamps: true });

// convenience index to speed up queries by participant and sort by last activity
ConversationSchema.index({ participants: 1, updatedAt: -1 });

module.exports = mongoose.model('Conversation', ConversationSchema);
