const express = require("express");
const db = require("../db");
const { auth } = require("../middleware/auth");

const router = express.Router();

const serverError = (res, err) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
};

// SAVE RESUME (new)
router.post("/resume", auth, (req, res) => {
  const { title, content, template_id } = req.body;
  const sql =
    "INSERT INTO resumes (user_id, title, content, template_id) VALUES (?, ?, ?, ?)";
  db.query(sql, [req.user.id, title, content, template_id], (err, result) => {
    if (err) return serverError(res, err);
    res.json({ message: "Resume saved", resume_id: result.insertId });
  });
});

// UPDATE MY RESUME (only if it belongs to the logged-in user)
router.put("/resume/:id", auth, (req, res) => {
  const { title, content, template_id } = req.body;
  db.query(
    "UPDATE resumes SET title = ?, content = ?, template_id = ? WHERE resume_id = ? AND user_id = ?",
    [title, content, template_id, req.params.id, req.user.id],
    (err, result) => {
      if (err) return serverError(res, err);
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Resume not found" });
      res.json({ message: "Resume updated", resume_id: Number(req.params.id) });
    }
  );
});

// GET MY RESUMES
router.get("/resumes/:userId", auth, (req, res) => {
  if (String(req.params.userId) !== String(req.user.id))
    return res.status(403).json({ message: "Not allowed" });

  const sql = `
    SELECT resume_id, title, template_id, created_at, content
    FROM resumes
    WHERE user_id = ?
    ORDER BY created_at DESC
  `;
  db.query(sql, [req.user.id], (err, results) => {
    if (err) return serverError(res, err);
    res.json(results);
  });
});

// DELETE MY RESUME
router.delete("/resume/:id", auth, (req, res) => {
  db.query(
    "DELETE FROM resumes WHERE resume_id = ? AND user_id = ?",
    [req.params.id, req.user.id],
    (err, result) => {
      if (err) return serverError(res, err);
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Resume not found" });
      res.json({ message: "Resume deleted" });
    }
  );
});

// TEMPLATES (public)
router.get("/templates", (req, res) => {
  db.query("SELECT * FROM templates", (err, results) => {
    if (err) return serverError(res, err);
    res.json(results);
  });
});

module.exports = router;