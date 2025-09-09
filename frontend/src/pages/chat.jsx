// src/pages/Chat.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Chat.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

function parseJwt(token) {
  try {
    const parts = token.split(".");
    if (!parts[1]) return null;
    return JSON.parse(atob(parts[1]));
  } catch (e) {
    return null;
  }
}

/* ===========================
   ErrorBoundary (shows errors instead of blank page)
   =========================== */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
    this.setState({ info });
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20 }}>
          <h2>Something went wrong</h2>
          <pre style={{ whiteSpace: "pre-wrap", color: "#900" }}>
            {String(this.state.error && this.state.error.toString())}
          </pre>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.info && this.state.info.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ===========================
   Chat component
   =========================== */
const Chat = () => {
  const navigate = useNavigate();
  const params = useParams();
  const convIdFromUrl = params.id || null;

  const [conversations, setConversations] = useState([]);
  const [activeConvId, setActiveConvId] = useState(convIdFromUrl);
  const [messages, setMessages] = useState([]);
  const [loadingConvos, setLoadingConvos] = useState(true);
  const [loadingMsgs, setLoadingMsgs] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [recipientInput, setRecipientInput] = useState("");
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const decoded = token ? parseJwt(token) : null;
  const userId = decoded?.id || decoded?._id || null;

  const messagesRef = useRef(null);
  const pollRef = useRef(null);

  useEffect(() => {
    loadConversations();
    // cleanup on unmount
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (convIdFromUrl) {
      setActiveConvId(convIdFromUrl);
      // open but don't allow unhandled promise rejection
      openConversation(convIdFromUrl).catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [convIdFromUrl]);

  async function loadConversations() {
    setLoadingConvos(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/chats`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.message || "Failed to load conversations");
      setConversations(body.conversations || []);
    } catch (err) {
      setError(err.message || "Failed to load conversations");
      setConversations([]);
    } finally {
      setLoadingConvos(false);
    }
  }

  async function openConversation(convId) {
    if (!convId) return;
    setActiveConvId(convId);
    setLoadingMsgs(true);
    setError(null);

    // stop existing poll
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }

    try {
      const res = await fetch(`${API_BASE}/api/chats/${convId}/messages?limit=200&page=1`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.message || "Failed to load messages");
      setMessages(Array.isArray(body.messages) ? body.messages : []);

      // start polling
      pollRef.current = setInterval(async () => {
        try {
          const r2 = await fetch(`${API_BASE}/api/chats/${convId}/messages?limit=200&page=1`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {}
          });
          const b2 = await r2.json().catch(() => ({}));
          if (r2.ok && Array.isArray(b2.messages)) {
            setMessages(b2.messages);
          }
        } catch (e) {
          // ignore polling errors
        }
      }, 2500);

      setTimeout(() => scrollToBottom(), 120);
    } catch (err) {
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
      setError(err.message || "Failed to open conversation");
      setMessages([]);
    } finally {
      setLoadingMsgs(false);
    }
  }

  function scrollToBottom() {
    try {
      if (messagesRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }
    } catch (e) {}
  }

  async function handleSend() {
    if (!token) {
      alert("Login required");
      return;
    }
    if (!newMessage.trim()) return;
    if (!activeConvId) return alert("Open a conversation first");

    setSending(true);
    try {
      const res = await fetch(`${API_BASE}/api/chats/${activeConvId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: newMessage.trim() }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.message || "Failed to send message");
      // append last message
      setMessages(prev => [...prev, body.messageDoc]);
      setNewMessage("");
      loadConversations();
      setTimeout(() => scrollToBottom(), 80);
    } catch (err) {
      alert(err.message || "Failed to send message");
    } finally {
      setSending(false);
    }
  }

  async function handleCreateConversation() {
    if (!token) return alert("Login required");
    if (!recipientInput.trim()) return alert("Provide recipient user id or exact name/email");

    try {
      const res = await fetch(`${API_BASE}/api/chats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ recipient: recipientInput.trim() }),
      });

      // multiple matches scenario
      if (res.status === 300) {
        const body = await res.json().catch(() => ({}));
        const matches = body.matches || [];
        const list = matches.map(m => `${m.name || '(no name)'} <${m.email || 'no-email'}> — id: ${m._id}`).join('\n');
        alert(`Multiple users matched:\n\n${list}\n\nPlease copy the desired user id and paste it into the input to start the conversation.`);
        return;
      }

      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.message || "Failed to create conversation");
      const convo = body.conversation;

      // load convos and open the new convo before navigating
      await loadConversations();
      setRecipientInput("");
      await openConversation(convo._id);
      navigate(`/chat/${convo._id}`);
    } catch (err) {
      alert(err.message || "Failed to create conversation");
    }
  }

  // helper: get sender id and display name (handles populated or raw id)
  function senderDisplay(m) {
    const sender = m?.sender;
    if (!sender) return { id: null, name: "Unknown" };
    if (typeof sender === "object") {
      const id = sender._id || sender.id || null;
      const name = sender.name || sender.email || (String(id) === String(userId) ? "You" : "Unknown");
      return { id, name };
    }
    return { id: sender, name: String(sender) === String(userId) ? "You" : "Unknown" };
  }

  return (
    <ErrorBoundary>
      <div className="chat-page">
        <aside className="chat-sidebar">
          <div className="sidebar-header">
            <h3>Chats</h3>
            <button className="btn small" onClick={loadConversations} aria-label="Refresh conversations">Refresh</button>
          </div>

          <div className="new-chat">
            <input
              placeholder="Recipient userId OR exact name/email (try: John Doe or john@example.com)"
              value={recipientInput}
              onChange={(e) => setRecipientInput(e.target.value)}
            />
            <button className="btn" onClick={handleCreateConversation}>Start</button>
          </div>

          <div className="convos-list">
            {loadingConvos ? <p>Loading...</p> : null}
            {conversations.length === 0 && !loadingConvos && <p className="muted">No conversations yet</p>}
            {conversations.map((c) => {
              const other = (c.participants || []).filter((p) => String(p._id) !== String(userId))[0] || c.participants[0];
              return (
                <div
                  key={c._id}
                  className={`convo-item ${String(c._id) === String(activeConvId) ? 'active' : ''}`}
                  onClick={() => { navigate(`/chat/${c._id}`); openConversation(c._id); }}
                >
                  <div className="convo-title">{other?.name || 'Unknown'}</div>
                  <div className="convo-sub">{c.lastMessage ? (c.lastMessage.text?.slice(0, 60) + (c.lastMessage.text?.length > 60 ? '...' : '')) : <span className="muted">No messages</span>}</div>
                </div>
              );
            })}
          </div>
        </aside>

        <main className="chat-main">
          {error ? <div className="error-banner">Error: {error}</div> : null}

          {!activeConvId ? (
            <div className="empty-state">
              <h3>Select a conversation</h3>
              <p>Or start a new one by pasting the recipient's user id or exact name/email on the left.</p>
            </div>
          ) : (
            <>
              <div className="messages" ref={messagesRef}>
                {loadingMsgs ? <p>Loading messages...</p> : null}
                {messages.length === 0 && !loadingMsgs && <p className="muted">No messages yet</p>}
                {messages.map((m, idx) => {
                  const { id: senderId, name: senderName } = senderDisplay(m);
                  const isMine = String(senderId) === String(userId);
                  const key = m._id || `msg-${idx}`;
                  const date = m.createdAt ? new Date(m.createdAt).toLocaleString() : '';
                  return (
                    <div key={key} className={`message ${isMine ? 'mine' : 'theirs'}`}>
                      <div className="message-meta">
                        <strong>{senderName}</strong>
                        <span className="msg-date">{date}</span>
                      </div>
                      <div className="message-body">{m.text}</div>
                    </div>
                  );
                })}
              </div>

              <div className="composer">
                <textarea
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  rows={2}
                />
                <div className="composer-actions">
                  <button className="btn" onClick={() => setNewMessage('')}>Clear</button>
                  <button className="btn interested" onClick={handleSend} disabled={sending}>{sending ? 'Sending...' : 'Send'}</button>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default Chat;
