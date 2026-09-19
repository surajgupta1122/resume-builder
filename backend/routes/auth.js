const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

const serverError = (res, err) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
};

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "All fields required" });

  const hashed = await bcrypt.hash(password, 10);
  const sql =
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'user')";
  db.query(sql, [name, email, hashed], (err) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY")
        return res.status(409).json({ message: "Email already registered" });
      return serverError(res, err);
    }
    res.json({ message: "Registered successfully" });
  });
});

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return serverError(res, err);

      const user = results[0];
      if (!user || !(await bcrypt.compare(password, user.password)))
        return res.status(401).json({ message: "Invalid email or password" });

      const role = user.role || "user";
      const token = jwt.sign({ id: user.user_id, role }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.json({
        message: "Login successful",
        token,
        user: { id: user.user_id, name: user.name, email: user.email, role },
      });
    }
  );
});

module.exports = router;