-- ============================================================
-- Online Resume Builder — MySQL Schema
-- BCA Project | Author: Suraj Gupta
-- ============================================================

CREATE DATABASE IF NOT EXISTS resume_builder
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE resume_builder;

-- ------------------------------------------------------------
-- Table: users
-- Stores registered user accounts with role-based access
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  user_id     INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(100) NOT NULL UNIQUE,
  password    VARCHAR(255) NOT NULL,
  role        VARCHAR(20)  NOT NULL DEFAULT 'user',
  created_at  DATETIME     DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Table: templates
-- Stores available resume template metadata
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS templates (
  template_id    VARCHAR(50)  PRIMARY KEY,
  template_name  VARCHAR(100) NOT NULL,
  preview_url    VARCHAR(255),
  description    TEXT
);

-- ------------------------------------------------------------
-- Table: resumes
-- Stores resumes saved by users
-- template_id stores the selected template (1 resume = 1 template)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS resumes (
  resume_id    INT AUTO_INCREMENT PRIMARY KEY,
  user_id      INT NOT NULL,
  title        VARCHAR(150),
  content      LONGTEXT,
  template_id  VARCHAR(50),
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_resume_user
    FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- Table: resume_template_map (optional — merged into resumes)
-- Kept for reference. Not actively used by the app; each
-- resume already stores its template_id in resumes.template_id
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS resume_template_map (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  resume_id    INT NOT NULL,
  template_id  VARCHAR(50) NOT NULL,
  CONSTRAINT fk_map_resume
    FOREIGN KEY (resume_id) REFERENCES resumes(resume_id)
    ON DELETE CASCADE,
  CONSTRAINT fk_map_template
    FOREIGN KEY (template_id) REFERENCES templates(template_id)
    ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- Seed: default admin account
-- Password: admin123 (bcrypt hash — change before real use)
-- ------------------------------------------------------------
INSERT IGNORE INTO users (name, email, password, role) VALUES
('Admin', 'admin@resume.com',
 '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
 'admin');