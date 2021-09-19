DROP DATABASE ramt;
CREATE DATABASE ramt;
\connect ramt

SET timezone = 'America/Los_Angeles';

CREATE TABLE users (
  email TEXT PRIMARY KEY
    CHECK (position('@' IN email) > 1),
  username VARCHAR(25) NOT NULL,
  password TEXT NOT NULL,
  profile_pic TEXT NOT NULL
);

CREATE TABLE userHistory (
  Personid INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  type TEXT NOT NULL,
  item TEXT NOT NULL,
  score INT NOT NULL,
  email TEXT NOT NULL,
  FOREIGN KEY (email) REFERENCES users ON DELETE CASCADE
);

CREATE TABLE history (
  id INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  type TEXT NOT NULL,
  item TEXT NOT NULL,
  score INT NOT NULL,
  time_created TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);