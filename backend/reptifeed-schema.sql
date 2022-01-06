﻿CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(20),
  password TEXT NOT NULL,
  email TEXT NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE reptiles (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  species TEXT NOT NULL,
  subspecies TEXT DEFAULT 'N/A',
  birthday DATE NOT NULL,
  img_url TEXT,
  owner_id INTEGER NOT NULL REFERENCES users ON DELETE CASCADE
);

CREATE TABLE pantries (
  owner_id INTEGER REFERENCES users ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  frequency TEXT NOT NULL,
  image TEXT NOT NULL,
  is_treat BOOLEAN NOT NULL,
  tips TEXT,
  CONSTRAINT food_name PRIMARY KEY (owner_id, name)
);

-- Test accounts
INSERT INTO users (username, password, email, is_admin)
VALUES ('testuser', '$2a$13$x9/O7D3Dpby5uZrJhKdP9eNWeFapfNSkeRcv1wWpAxzduCBM8qfty', 'test@test.com', FALSE),
-- hashed password is testpassword
       ('testadmin', '$2a$13$btV21u6VSduaG7KMf5tyteNl2/5MU.guMddvRcxMExwokBvJR5x1.', 'admin@test.com', TRUE)
-- hashed password is adminpassword