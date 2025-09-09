// routes/projects.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Project = require("../model/Project");
const { verifyToken } = require("./auth"); // your middleware that sets req.user { id, ... }

/**
 * Helper: safe extraction of caller id
 */
function getCallerId(req) {
  return (req.user && (req.user.id || req.user._id)) ? String(req.user.id || req.user._id) : null;
}

/**
 * GET /         - list all projects
 * If request contains a valid Authorization header and verifyToken is used on the request,
 * the route will include isInterested for the requesting user.
 */
router.get("/", async (req, res) => {
  try {
    // If client passed Authorization header we won't run verifyToken here,
    // but we can attempt to read it by calling verifyToken as middleware would.
    // For simplicity, assume client may or may not be authenticated; req.user may be present if upstream middleware runs.
    // Query projects and populate users + comment users
    const projects = await Project.find()
      .populate("user", "name email")
      .populate("comments.user", "name email")
      .sort({ createdAt: -1 });

    const callerId = getCallerId(req); // will be null if not authenticated

    const out = projects.map((p) => {
      const obj = p.toObject();
      obj.interestedCount = Array.isArray(p.interested) ? p.interested.length : 0;
      // Provide isInterested only if we know callerId (avoid leaking full interested array)
      obj.isInterested = callerId ? p.interested.some((uid) => String(uid) === callerId) : false;
      // remove the raw interested array from response for privacy
      delete obj.interested;
      return obj;
    });

    return res.json({ projects: out });
  } catch (err) {
    console.error("Fetch projects error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

/**
 * GET /:id      - get one project
 */
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("user", "name email")
      .populate("comments.user", "name email");

    if (!project) return res.status(404).json({ message: "Project not found" });

    const callerId = getCallerId(req);

    const obj = project.toObject();
    obj.interestedCount = Array.isArray(project.interested) ? project.interested.length : 0;
    obj.isInterested = callerId ? project.interested.some((uid) => String(uid) === callerId) : false;
    delete obj.interested;

    return res.json({ project: obj });
  } catch (err) {
    console.error("Fetch project error:", err);
    if (err instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid project id" });
    }
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

/**
 * POST /        - create a new project (protected)
 */
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, description, githubLink, techStack } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const newProject = new Project({
      title,
      description,
      githubLink,
      techStack,
      user: req.user.id,
    });

    await newProject.save();
    await newProject.populate("user", "name email");

    const obj = newProject.toObject();
    obj.interestedCount = 0;
    obj.isInterested = false;
    delete obj.interested;

    return res.status(201).json({ message: "Project created", project: obj });
  } catch (err) {
    console.error("Create project error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

/**
 * DELETE /:id   - delete a project (only owner)
 */
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (String(project.user) !== String(req.user.id)) {
      return res.status(403).json({ message: "Not authorized to delete this project" });
    }

    await project.deleteOne();
    return res.json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error("Delete project error:", err);
    if (err instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid project id" });
    }
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

/**
 * POST /:id/comments    - add a comment (protected)
 */
router.post("/:id/comments", verifyToken, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    // push comment as subdocument
    project.comments.push({ user: req.user.id, text: text.trim() });
    await project.save();

    // populate the newly added comment's user for a good response
    // the pushed comment will be last in array
    await project.populate("comments.user", "name email");
    const newComment = project.comments[project.comments.length - 1];

    return res.status(201).json({ message: "Comment added", comment: newComment });
  } catch (err) {
    console.error("Add comment error:", err);
    if (err instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid project id" });
    }
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

/**
 * DELETE /:projectId/comments/:commentId
 * Delete a comment (protected). Allowed for comment author OR project owner.
 * Implementation uses a projection check + atomic $pull to avoid subdoc save issues.
 */
router.delete("/:projectId/comments/:commentId", verifyToken, async (req, res) => {
  const { projectId, commentId } = req.params;

  try {
    // 1) find the project and the matching comment quickly (return only matched comment and owner)
    const project = await Project.findOne(
      { _id: projectId, "comments._id": commentId },
      { "comments.$": 1, user: 1 }
    ).lean();

    if (!project) {
      return res.status(404).json({ message: "Project or comment not found" });
    }

    const comment = project.comments && project.comments[0];
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const callerId = getCallerId(req);
    if (!callerId) return res.status(401).json({ message: "Unauthorized" });

    const isCommentAuthor = String(comment.user) === callerId;
    const isProjectOwner = String(project.user) === callerId;

    if (!isCommentAuthor && !isProjectOwner) {
      return res.status(403).json({ message: "Not authorized to delete this comment" });
    }

    // 2) Remove the comment atomically
    const updated = await Project.findByIdAndUpdate(
      projectId,
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    ).select("comments").lean();

    const commentsCount = (updated && updated.comments && updated.comments.length) || 0;
    return res.json({ message: "Comment deleted", commentsCount });
  } catch (err) {
    console.error("Delete comment error:", err);
    if (err instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid id format" });
    }
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

/**
 * POST /:id/interest
 * Toggle interest for authenticated user.
 * Response: { message, interestedCount, isInterested }
 */
router.post("/:id/interest", verifyToken, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const userId = String(req.user.id);
    const already = project.interested.some((u) => String(u) === userId);

    let updated;
    if (already) {
      // remove user
      updated = await Project.findByIdAndUpdate(
        req.params.id,
        { $pull: { interested: userId } },
        { new: true }
      ).select("interested").lean();
    } else {
      // add user (unique)
      updated = await Project.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { interested: userId } },
        { new: true }
      ).select("interested").lean();
    }

    const interestedCount = (updated && updated.interested && updated.interested.length) || 0;
    return res.json({
      message: already ? "Interest removed" : "Marked as interested",
      interestedCount,
      isInterested: !already
    });
  } catch (err) {
    console.error("Toggle interest error:", err);
    if (err instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid project id" });
    }
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;