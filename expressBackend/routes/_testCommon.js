const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");
const { createToken } = require("../helpers/tokens");

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM userHistory");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM history");

  await db.query(`
        INSERT INTO users (email,
                          username,
                          password,
                          profile_pic)
        VALUES ('u1@email.com', 'u1', $1, ''),
                ('u2@email.com', 'u2', $2, '')`,
      [
        await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
        await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
      ]);

  await db.query(`
        INSERT INTO userHistory (type,
                                  item,
                                  score,
                                  email)
        VALUES ('email', 'test@example.com', 40, 'u1@email.com'),
                ('url', 'netflix.com', 88, 'u2@email.com')`);

  await db.query(`
        INSERT INTO history (type,
                            item,
                            score,
                            popularity)
        VALUES ('email', 'test@example.com', 40, 0),
                ('url', 'netflix.com', 88, 0)`);
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

const u1Token = createToken({ username: "u1", email: "u1@email.com" });
const u2Token = createToken({ username: "u2", email: "u2@email.com" });

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
};