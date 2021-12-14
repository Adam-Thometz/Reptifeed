CREATE TABLE users (
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

CREATE TABLE pantry (
  owner_id INTEGER PRIMARY KEY REFERENCES users,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  frequency TEXT NOT NULL,
  is_treat BOOLEAN NOT NULL,
  tips TEXT
);