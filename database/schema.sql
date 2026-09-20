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
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS templates (
  template_id    VARCHAR(50)  PRIMARY KEY,
  template_name  VARCHAR(100) NOT NULL,
  preview_url    VARCHAR(255),
  description    TEXT
);

-- ------------------------------------------------------------
-- Table: resumes
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
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS resume_template_map (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  resume_id    INT NOT NULL,
  template_id  VARCHAR(50) NOT NULL,
  CONSTRAINT fk_map_resume
    FOREIGN KEY (resume_id) REFERENCES resumes(resume_id)
    ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- Seed: default admin account
-- Email: admin@resume.com | Password: admin123
-- ------------------------------------------------------------
INSERT IGNORE INTO users (name, email, password, role) VALUES
('Admin', 'admin@resume.com',
 '$2b$10$7DgvaaXz3HPJ4wUrG/WOl.5GgkrCauBmj8WzRCUBfMrlJqgpo.R4W',
 'admin');

-- ------------------------------------------------------------
-- Seed: available resume templates
-- ------------------------------------------------------------
INSERT IGNORE INTO templates (template_id, template_name, preview_url, description) VALUES
('minimal-mark',       'Mark Brown',         NULL, 'Minimal — name left, details right'),
('minimal-sebastian',  'Sebastian Bennett',  NULL, 'Minimal — centered header'),
('pro-isabel',         'Isabel Mercado',     NULL, 'Professional — 2-column with black bars'),
('pro-geometric',      'Geometric',          NULL, 'Professional — geometric layout'),
('pro-dark',           'Noel Taylor',        NULL, 'Professional — dark sidebar with photo'),
('creative-isabel',    'Creative Isabel',    NULL, 'Creative — black pill headers'),
('creative-geometric', 'Creative Geometric', NULL, 'Creative — blue and black diagonal'),
('creative-noel',      'Creative Noel',      NULL, 'Creative — dark sidebar timeline'),
('ats',                'ATS-Friendly',       NULL, 'Plain format for job portals'),
('ats-pro',            'ATS Professional',   NULL, 'Bold black bar headers');