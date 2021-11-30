CREATE TABLE "users" (
    "id" int   NOT NULL,
    "username" string   NOT NULL,
    "password" string   NOT NULL,
    "email" string   NOT NULL,
    CONSTRAINT "pk_users" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "reptiles" (
    "id" int   NOT NULL,
    "name" string   NOT NULL,
    "birthday" date   NOT NULL,
    "img_url" string   NOT NULL,
    "owner" string   NOT NULL,
    CONSTRAINT "pk_reptiles" PRIMARY KEY (
        "id"
     )
);

ALTER TABLE "reptiles" ADD CONSTRAINT "fk_reptiles_owner" FOREIGN KEY("owner")
REFERENCES "users" ("id");

