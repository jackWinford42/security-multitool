DROP DATABASE ramt;
CREATE DATABASE ramt;
\connect ramt

CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  profile_pic TEXT NOT NULL
);