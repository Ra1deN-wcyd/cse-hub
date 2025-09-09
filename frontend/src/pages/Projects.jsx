import React, { useState, useEffect } from "react";
import "./Projects.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

// simple jwt decoder (no extra libraries)
function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
}

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [techStack, setTechStack] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem("token");
  const decoded = token ? parseJwt(token) : null;
  const loggedInUserId = decoded?.id || decoded?._id || null;

  // UI helpers state
  // commentInputs: { [projectId]: 'text' }
  const [commentInputs, setCommentInputs] = useState({});
  // opLoading: { [opKey]: boolean } where opKey could be `interest:${id}` or `comment:${id}`
  const [opLoading, setOpLoading] = useState({});

  // Load projects
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/projects`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load");

        // backend currently returns projects without `isInterested` for current user.
        // We'll add a UI-only `isInterested` flag defaulting to false. After the user toggles interest
        // we'll update it from the server response.
        const withUI = (data.projects || []).map((p) => ({ ...p, isInterested: false }));

        setProjects(withUI);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Create project
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !githubLink) {
      alert("Fill all required fields");
      return;
    }

    const techArray = techStack
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (!token) {
      alert("Login required");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          githubLink,
          techStack: techArray,
        }),
      });

      const body = await res.json();
      if (!res.ok) throw new Error(body.message || "Failed to create");

      // attach UI fields to the returned project
      const created = { ...body.project, isInterested: false, comments: body.project.comments || [], interestedCount: body.project.interested?.length || 0 };

      setProjects((prev) => [created, ...prev]);

      setTitle("");
      setDescription("");
      setGithubLink("");
      setTechStack("");
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Delete project
  const handleDelete = async (id) => {
    if (!token) return alert("Login required");
    if (!window.confirm("Delete this project?")) return;

    try {
      const res = await fetch(`${API_BASE}/api/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.message || "Failed to delete");

      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  // Toggle interest (POST /api/projects/:id/interest)
  const handleToggleInterest = async (projectId) => {
    if (!token) return alert("Login required");

    const opKey = `interest:${projectId}`;
    setOpLoading((s) => ({ ...s, [opKey]: true }));

    try {
      const res = await fetch(`${API_BASE}/api/projects/${projectId}/interest`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.message || "Failed to toggle interest");

      // update project in state using returned interestedCount and isInterested
      setProjects((prev) =>
        prev.map((p) =>
          p._id === projectId
            ? { ...p, interestedCount: body.interestedCount ?? (p.interestedCount || 0), isInterested: !!body.isInterested }
            : p
        )
      );
    } catch (err) {
      alert(err.message);
    } finally {
      setOpLoading((s) => ({ ...s, [opKey]: false }));
    }
  };

  // Add comment
  const handleAddComment = async (projectId) => {
    if (!token) return alert("Login required");
    const text = (commentInputs[projectId] || "").trim();
    if (!text) return alert("Comment cannot be empty");

    const opKey = `comment:add:${projectId}`;
    setOpLoading((s) => ({ ...s, [opKey]: true }));

    try {
      const res = await fetch(`${API_BASE}/api/projects/${projectId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
      });

      const body = await res.json();
      if (!res.ok) throw new Error(body.message || "Failed to add comment");

      // server returns the new comment (populated user)
      const newComment = body.comment;

      setProjects((prev) => prev.map((p) => (p._id === projectId ? { ...p, comments: [...(p.comments || []), newComment] } : p)));

      setCommentInputs((s) => ({ ...s, [projectId]: "" }));
    } catch (err) {
      alert(err.message);
    } finally {
      setOpLoading((s) => ({ ...s, [opKey]: false }));
    }
  };

  // Delete comment
  const handleDeleteComment = async (projectId, commentId) => {
    if (!token) return alert("Login required");
    if (!window.confirm("Delete this comment?")) return;

    const opKey = `comment:del:${projectId}:${commentId}`;
    setOpLoading((s) => ({ ...s, [opKey]: true }));

    try {
      const res = await fetch(`${API_BASE}/api/projects/${projectId}/comments/${commentId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.message || "Failed to delete comment");

      setProjects((prev) => prev.map((p) => (p._id === projectId ? { ...p, comments: (p.comments || []).filter((c) => c._id !== commentId) } : p)));
    } catch (err) {
      alert(err.message);
    } finally {
      setOpLoading((s) => ({ ...s, [opKey]: false }));
    }
  };

  if (loading) return <p>Loading projects...</p>;
  if (fetchError) return <p style={{ color: "red" }}>Error: {fetchError}</p>;

  return (
    <div className="projects-container">
      <h1 className="projects-title">Student Projects</h1>

      <form onSubmit={handleSubmit} className="project-form">
        <h2>Create New Project Post</h2>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Project Title"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Project Description"
        />

        <input
          type="text"
          value={githubLink}
          onChange={(e) => setGithubLink(e.target.value)}
          placeholder="GitHub Repository Link"
        />

        <input
          type="text"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
          placeholder="Tech Stack (comma separated)"
        />

        <button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Create Project"}
        </button>
      </form>

      <div className="project-list">
        {projects.length === 0 ? (
          <p>No projects yet.</p>
        ) : (
          projects.map((project) => (
            <div key={project._id} className="project-card">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              {project.githubLink && (
                <p>
                  GitHub:{" "}
                  <a href={project.githubLink} target="_blank" rel="noreferrer">
                    {project.githubLink}
                  </a>
                </p>
              )}
              <p>Tech Stack: {(project.techStack || []).join(", ")}</p>
              <p>Posted by: {project.user?.name || "Unknown"}</p>

              <div className="project-actions">
                <button
                  onClick={() => handleToggleInterest(project._id)}
                  disabled={!!opLoading[`interest:${project._id}`]}
                  className={project.isInterested ? "btn interested" : "btn"}
                >
                  {project.isInterested ? "Interested ✓" : "Mark Interested"} ({project.interestedCount ?? 0})
                </button>

                {project.user?._id === loggedInUserId && (
                  <button onClick={() => handleDelete(project._id)} className="btn danger">
                    Delete
                  </button>
                )}
              </div>

              {/* COMMENTS */}
              <div className="comments-section">
                <h4>Comments ({(project.comments || []).length})</h4>

                {(project.comments || []).map((c) => (
                  <div key={c._id} className="comment-item">
                    <div className="comment-header">
                      <strong>{c.user?.name || "Unknown"}</strong>
                      <span className="comment-date">{new Date(c.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="comment-text">{c.text}</p>

                    {(c.user?._id === loggedInUserId || project.user?._id === loggedInUserId) && (
                      <button
                        onClick={() => handleDeleteComment(project._id, c._id)}
                        disabled={!!opLoading[`comment:del:${project._id}:${c._id}`]}
                        className="btn small danger"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                ))}

                <div className="comment-form">
                  <textarea
                    placeholder="Write a comment..."
                    value={commentInputs[project._id] || ""}
                    onChange={(e) => setCommentInputs((s) => ({ ...s, [project._id]: e.target.value }))}
                  />
                  <button
                    onClick={() => handleAddComment(project._id)}
                    disabled={!!opLoading[`comment:add:${project._id}`]}
                    className="btn"
                  >
                    Add Comment
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Projects;
