const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  ssl: {
    rejectUnauthorized: false,
    minVersion: "TLSv1.2",
  },
  connectTimeout: 30000,
});

db.connect((err) => {
  if (err) {
    console.log("DB connection failed:", err.message);
  } else {
    console.log("MySQL connected (Aiven)");
  }
});

module.exports = db;