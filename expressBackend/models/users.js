"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");

const {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

class User {
    /** authenticate user with username, password.
   *
   * Returns { username, first_name, last_name, email, is_admin }
   *
   * Throws UnauthorizedError is user not found or wrong password.
   **/

  static async authenticate(username, password) {
    // try to find the user first
    const result = await db.query(
          `SELECT username,
            password,
            email,
            profile_pic
            FROM users
            WHERE username = $1`,
        [username],
    );

    const user = result.rows[0];

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  /** Register user with data.
   *
   * Returns { username, firstName, lastName, email, isAdmin }
   *
   * Throws BadRequestError on duplicates.
   **/
  static async register({ username, password, email, profile_pic }) {
    const duplicateCheck = await db.query(
          `SELECT username
          FROM users
          WHERE username = $1`,
        [username],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = (!!profile_pic) ? (
      await db.query(
        `INSERT INTO users
        (username,
          password,
          email,
          profile_pic)
        VALUES ($1, $2, $3, $4)
        RETURNING username, email, profile_pic`,
        [
          username,
          hashedPassword,
          email,
          profile_pic,
        ],
      )) : (
        await db.query(
          `INSERT INTO users
          (username,
            password,
            email)
          VALUES ($1, $2, $3)
          RETURNING username, email`,
          [
            username,
            hashedPassword,
            email,
          ],
      ))

    return result.rows[0];
  }

  /** Given a username, return data about user.
   *
   * Returns { username, email, profile_pic }
   *
   * Throws NotFoundError if user not found.
  **/
  static async get(email) {
    const userRes = await db.query(
          `SELECT username,
                  email,
                  profile_pic
            FROM users
            WHERE email = $1`,
        [email],
    );

    const user = userRes.rows[0];
    if (user === undefined) throw new NotFoundError(`No user: ${email}`);

    return user;
  }

  /** Given an email deleted a user's corresponding row from the table
   * 
   * Returns { deleted: username }
   * 
   * Throws NotFoundError if user not found.
   **/
  static async remove(email) {
    await db.query(
      `DELETE 
      FROM users
      WHERE email=$1`,
      [email],
    );

    return { deleted: email }
  }

  /** Given email and data for updating, update a user's row
   * 
   * Returns updated user row 
   **/
  static async update(email, data) {
    const userRes = (data.profile_pic) ? (
      await db.query(
        `UPDATE users
        SET username=$1, profile_pic=$2
        WHERE email=$3
        RETURNING username`,
        [data.username, data.profile_pic, email],
      )) :
      (await db.query(
        `UPDATE users
        SET username=$1, profile_pic='https://bit.ly/3mx9za2'
        WHERE email=$2
        RETURNING username`,
        [data.username, email],
      ))
    const user = userRes.rows[0];

    return {username: user.username, email: email};
  }
}

module.exports = User;