CREATE TABLE users (
    username VARCHAR(25) PRIMARY KEY,
    password TEXT NOT NULL,
    email TEXT NOT NULL,
);

CREATE TABLE reptiles (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    birthday DATE NOT NULL,
    img_url TEXT NOT NULL,
    owner TEXT NOT NULL REFERENCES users ON DELETE CASCADE
);
