const express = require("express");
const db = require("../db");
const { auth, adminOnly } = require("../middleware/auth");

const router = express.Router();

const serverError = (res, err) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
};

// Apply auth + admin check to every route in this file
router.use(auth, adminOnly);

// Get all users
router.get("/users", (req, res) => {
  db.query(
    "SELECT user_id, name, email, role, created_at FROM users",
    (err, results) => {
      if (err) return serverError(res, err);
      res.json(results);
    }
  );
});

// Get all resumes
router.get("/resumes", (req, res) => {
  const sql = `
    SELECT r.resume_id, r.title, r.template_id, r.created_at,
           u.name AS user_name, u.email AS user_email
    FROM resumes r
    JOIN users u ON r.user_id = u.user_id
    ORDER BY r.created_at DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return serverError(res, err);
    res.json(results);
  });
});

// Template usage count
router.get("/template-usage", (req, res) => {
  const sql = `
    SELECT template_id, COUNT(*) AS usage_count
    FROM resumes
    GROUP BY template_id
  `;
  db.query(sql, (err, results) => {
    if (err) return serverError(res, err);
    res.json(results);
  });
});

// Users with resume count (User Activity Report)
router.get("/user-activity", (req, res) => {
  const sql = `
    SELECT u.user_id, u.name, u.email, u.role, u.created_at,
           COUNT(r.resume_id) AS resume_count
    FROM users u
    LEFT JOIN resumes r ON u.user_id = r.user_id
    GROUP BY u.user_id
    ORDER BY u.created_at DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return serverError(res, err);
    res.json(results);
  });
});

// Get all templates list
router.get("/templates", (req, res) => {
  db.query(
    "SELECT template_id, template_name, preview_url, description FROM templates ORDER BY template_id",
    (err, results) => {
      if (err) return serverError(res, err);
      res.json(results);
    }
  );
});

module.exports = router;