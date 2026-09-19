const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const db = require("./db");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// REGISTER
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields required" });

  const hashed = await bcrypt.hash(password, 10);
  const sql =
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'user')";
  db.query(sql, [name, email, hashed], (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Registered successfully" });
  });
});

// LOGIN
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    if (results.length === 0)
      return res.status(401).json({ message: "User not found" });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Wrong password" });

    res.json({
      message: "Login successful",
      user: {
        id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role || "user",
      },
    });
  });
});

// SAVE RESUME
app.post("/api/resume", (req, res) => {
  const { user_id, title, content, template_id } = req.body;
  const sql =
    "INSERT INTO resumes (user_id, title, content, template_id) VALUES (?, ?, ?, ?)";
  db.query(sql, [user_id, title, content, template_id], (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Resume saved" });
  });
});

// GET RESUMES FOR A USER
app.get("/api/resumes/:userId", (req, res) => {
  const userId = req.params.userId;
  const sql = `
    SELECT resume_id, title, template_id, created_at, content
    FROM resumes
    WHERE user_id = ?
    ORDER BY created_at DESC
  `;
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
});

// DELETE A RESUME
app.delete("/api/resume/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM resumes WHERE resume_id = ?", [id], (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Resume deleted" });
  });
});

// GET TEMPLATES
app.get("/api/templates", (req, res) => {
  db.query("SELECT * FROM templates", (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
});

// ADMIN: Get all users
app.get("/api/admin/users", (req, res) => {
  db.query(
    "SELECT user_id, name, email, role, created_at FROM users",
    (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json(results);
    }
  );
});

// ADMIN: Get all resumes
app.get("/api/admin/resumes", (req, res) => {
  const sql = `
    SELECT r.resume_id, r.title, r.template_id, r.created_at,
           u.name AS user_name, u.email AS user_email
    FROM resumes r
    JOIN users u ON r.user_id = u.user_id
    ORDER BY r.created_at DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
});

// ADMIN: Template usage count
app.get("/api/admin/template-usage", (req, res) => {
  const sql = `
    SELECT template_id, COUNT(*) AS usage_count
    FROM resumes
    GROUP BY template_id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
});

// ADMIN: Users with resume count (User Activity Report)
app.get("/api/admin/user-activity", (req, res) => {
  const sql = `
    SELECT u.user_id, u.name, u.email, u.role, u.created_at,
           COUNT(r.resume_id) AS resume_count
    FROM users u
    LEFT JOIN resumes r ON u.user_id = r.user_id
    GROUP BY u.user_id
    ORDER BY u.created_at DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
});

// ADMIN: Get all templates list
app.get("/api/admin/templates", (req, res) => {
  db.query(
    "SELECT template_id, template_name, preview_url, description FROM templates ORDER BY template_id",
    (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json(results);
    }
  );
});

app.listen(process.env.PORT, () => {
  console.log("Backend running on port " + process.env.PORT);
});