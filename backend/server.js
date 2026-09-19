require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const resumeRoutes = require("./routes/resumes");
const adminRoutes = require("./routes/admin");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL ? process.env.CLIENT_URL.split(",") : true,
  })
);
app.use(express.json());

// Routes
app.use("/api", authRoutes);
app.use("/api", resumeRoutes);
app.use("/api/admin", adminRoutes);

app.listen(process.env.PORT, () => {
  console.log("Backend running on port " + process.env.PORT);
});