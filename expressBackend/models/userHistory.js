"use strict";

const db = require("../db");

class UserHistory {
  /** add history for user with data.
   *
   * Returns { type, item, score, email }
   **/
  static async add(type, item, score, email) {
    const added = await db.query(
      `INSERT INTO userHistory 
      (type,
        item,
        score,
        email)
      VALUES ($1, $2, $3, $4)
      RETURNING type, item, score, email`,
      [
        type,
        item,
        score,
        email,
      ],
    );

    return added.rows[0];
  }

  /** get history for a user based on their unique email
   * 
   * Returns { history: user's entire history }
   */
  static async get(email) {
    const userHistory = await db.query(
      `SELECT type, item, score, time_created
      FROM userHistory
      WHERE email=$1
      ORDER BY time_created DESC`,
      [email],
    )
    return { history: userHistory }
  }

  /** clear a user's history based on their unique email
   * 
   * on success Returns { cleared: username's history }
   * 
   * if the user does not exist then throw a NotFoundError
   */
  static async dump(email) {
    await db.query(
      `DELETE 
      FROM userHistory
      WHERE email=$1`,
      [email],
    );

    return { cleared: `${email}'s history` }
  }
}

module.exports = UserHistory;