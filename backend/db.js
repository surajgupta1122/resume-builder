const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createPool({
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
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

module.exports = db;