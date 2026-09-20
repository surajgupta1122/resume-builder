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

// non-empty string check (stops numbers/objects sent by hand from crashing bcrypt)
const isText = (v) => typeof v === "string" && v.trim() !== "";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body ?? {};
  if (![name, email, password].every(isText))
    return res.status(400).json({ message: "All fields required" });
  if (name.trim().length < 2)
    return res
      .status(400)
      .json({ message: "Name must be at least 2 characters" });
  if (!emailRegex.test(email.trim()))
    return res.status(400).json({ message: "Enter a valid email address" });
  if (password.length < 6)
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });

  const hashed = await bcrypt.hash(password, 10);
  const sql =
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'user')";
  db.query(sql, [name.trim(), email.trim(), hashed], (err) => {
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
  const { email, password } = req.body ?? {};
  if (!isText(email) || !isText(password))
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