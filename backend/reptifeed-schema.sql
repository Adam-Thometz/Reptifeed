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

CREATE TABLE pantries (
  owner_id INTEGER REFERENCES users ON DELETE CASCADE,
  name TEXT NOT NULL PRIMARY KEY,
  type TEXT NOT NULL,
  frequency TEXT NOT NULL,
  image TEXT NOT NULL,
  is_treat BOOLEAN NOT NULL,
  tips TEXT
);