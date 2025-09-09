// routes/chats.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Conversation = require('../model/Conversation');
const User = require('../model/User');
const { verifyToken } = require('./auth'); // matches your auth.js export

// helper to get caller id string
function getCallerId(req) {
  // expect verifyToken to attach user to req.user
  const id = req.user && (req.user.id || req.user._id) ? (req.user.id || req.user._id) : null;
  return id ? String(id) : null;
}

/**
 * POST /        - create (or return existing) 1-on-1 conversation
 * body: { recipientId } OR body: { recipient } (name or email)
 * Returns conversation (populated participants)
 */
router.post('/', verifyToken, async (req, res) => {
  try {
    const callerId = getCallerId(req);
    if (!callerId) return res.status(401).json({ message: 'Unauthorized' });

    // Accept either `recipientId` (ObjectId string) or `recipient` (name/email string)
    const { recipientId, recipient } = req.body;
    let recipientIdToUse = recipientId ? String(recipientId).trim() : null;
    let resolvedRecipient = null;

    if (!recipientIdToUse && !recipient) {
      return res.status(400).json({ message: 'recipientId or recipient (name/email) is required' });
    }

    // If recipientId looks like an ObjectId, try to use it directly
    if (recipientIdToUse && mongoose.Types.ObjectId.isValid(recipientIdToUse)) {
      resolvedRecipient = await User.findById(recipientIdToUse).select('_id name email');
      if (!resolvedRecipient) return res.status(404).json({ message: 'Recipient not found by id' });
    } else {
      // Try resolving by exact (case-insensitive) name or email match first.
      const candidate = (recipient || '').trim();
      if (!candidate) return res.status(400).json({ message: 'recipient is empty' });

      const exactRegex = new RegExp(`^${candidate.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i');

      // First try exact name or email
      let matches = await User.find({
        $or: [{ name: exactRegex }, { email: exactRegex }]
      }).select('_id name email').limit(10).lean();

      if (matches.length === 0) {
        // fallback to partial (contains) search (case-insensitive)
        const partialRegex = new RegExp(candidate.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
        matches = await User.find({
          $or: [{ name: partialRegex }, { email: partialRegex }]
        }).select('_id name email').limit(10).lean();
      }

      if (matches.length === 0) {
        return res.status(404).json({ message: 'No users matched that name/email' });
      }

      if (matches.length === 1) {
        resolvedRecipient = matches[0];
      } else {
        // multiple matches — return them so frontend can ask user to pick exactly
        return res.status(300).json({ message: 'Multiple users matched', matches });
      }
    }

    // now we have resolvedRecipient (Mongoose doc or plain object)
    const recipientIdFinal = String(resolvedRecipient._id);
    if (!recipientIdFinal) return res.status(404).json({ message: 'Recipient resolution failed' });
    if (recipientIdFinal === String(callerId)) return res.status(400).json({ message: 'Cannot create conversation with yourself' });

    // try to find an existing 1-on-1 conversation between the two users
    let convo = await Conversation.findOne({ participants: { $all: [callerId, recipientIdFinal] } })
      .populate('participants', 'name email')
      .exec();

    // if an existing convo has exactly 2 participants, return it (1-on-1)
    if (convo && convo.participants && convo.participants.length === 2) {
      return res.json({ conversation: convo });
    }

    // otherwise create a new 1-on-1 conversation
    convo = new Conversation({
      participants: [callerId, recipientIdFinal],
      messages: []
    });

    await convo.save();
    await convo.populate('participants', 'name email');

    return res.status(201).json({ conversation: convo });
  } catch (err) {
    console.error('Create conversation error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});

/**
 * GET /        - get all conversations for the authenticated user
 * Returns conversations populated with participants and last message
 */
router.get('/', verifyToken, async (req, res) => {
  try {
    const callerId = getCallerId(req);
    if (!callerId) return res.status(401).json({ message: 'Unauthorized' });

    // fetch conversations where caller is a participant, sort by updatedAt desc
    let convos = await Conversation.find({ participants: callerId })
      .sort({ updatedAt: -1 })
      .populate('participants', 'name email')
      .lean();

    // attach a small lastMessage preview for each convo
    convos = convos.map((c) => {
      const last = (c.messages && c.messages.length) ? c.messages[c.messages.length - 1] : null;
      return {
        _id: c._id,
        participants: c.participants,
        lastMessage: last ? { _id: last._id, sender: last.sender, text: last.text, createdAt: last.createdAt } : null,
        updatedAt: c.updatedAt,
        messagesCount: (c.messages && c.messages.length) || 0
      };
    });

    return res.json({ conversations: convos });
  } catch (err) {
    console.error('Fetch conversations error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});

/**
 * GET /:id/messages?limit=50&page=1
 * Returns messages for a conversation (only if caller is a participant).
 * Uses slice to return last `limit` messages; pagination is basic.
 */
router.get('/:id/messages', verifyToken, async (req, res) => {
  try {
    const callerId = getCallerId(req);
    const convId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(convId)) return res.status(400).json({ message: 'Invalid conversation id' });

    const limit = Math.min(parseInt(req.query.limit || '50', 10), 200);
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);

    const convo = await Conversation.findById(convId).populate('messages.sender', 'name email').lean();
    if (!convo) return res.status(404).json({ message: 'Conversation not found' });

    if (!convo.participants.map(String).includes(String(callerId))) {
      return res.status(403).json({ message: 'Not a participant of this conversation' });
    }

    // simple pagination from the end (most recent). For large data consider separate Message model
    const total = convo.messages.length;
    const start = Math.max(total - page * limit, 0);
    const end = Math.max(total - (page - 1) * limit, 0);
    const pageMessages = convo.messages.slice(start, end);

    return res.json({
      messages: pageMessages,
      meta: { total, limit, page }
    });
  } catch (err) {
    console.error('Get messages error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});

/**
 * POST /:id/messages
 * Send a message in conversation (must be a participant).
 * body: { text }
 */
router.post('/:id/messages', verifyToken, async (req, res) => {
  try {
    const callerId = getCallerId(req);
    const convId = req.params.id;
    const { text } = req.body;

    if (!text || !text.trim()) return res.status(400).json({ message: 'Message text is required' });
    if (!mongoose.Types.ObjectId.isValid(convId)) return res.status(400).json({ message: 'Invalid conversation id' });

    const convo = await Conversation.findById(convId);
    if (!convo) return res.status(404).json({ message: 'Conversation not found' });
    if (!convo.participants.map(String).includes(String(callerId))) {
      return res.status(403).json({ message: 'Not a participant of this conversation' });
    }

    // push message
    const message = { sender: callerId, text: text.trim(), createdAt: new Date() };
    convo.messages.push(message);
    // updatedAt will be set by timestamps when saving
    convo.updatedAt = new Date();
    await convo.save();

    // populate the last message sender for response
    await convo.populate('messages.sender', 'name email');
    const lastMsg = convo.messages[convo.messages.length - 1];

    return res.status(201).json({ message: 'Message sent', messageDoc: lastMsg });
  } catch (err) {
    console.error('Send message error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
