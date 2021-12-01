CREATE TABLE "users" (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL,
    CONSTRAINT "pk_users" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "reptiles" (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    birthday DATE NOT NULL,
    img_url TEXT NOT NULL,
    owner_id TEXT NOT NULL,
    CONSTRAINT "pk_reptiles" PRIMARY KEY (
        "id"
     )
);

ALTER TABLE "reptiles" ADD CONSTRAINT "fk_reptiles_owner" FOREIGN KEY("owner")
REFERENCES "users" ("id");

