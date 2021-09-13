"use strict";

const db = require("../db");

class SiteHistory {
  /** add history for site with data.
   *
   * Returns { type, item, score }
   **/
  static async add(type, item, score) {
    const added = await db.query(
      `INSERT INTO history 
      (type,
        item,
        score)
      VALUES ($1, $2, $3)
      RETURNING type, item, score`,
      [
        type,
        item,
        score
      ],
    );

    return added.rows[0];
  }

  /** get history for the entire site
   * 
   * Returns { history: user's entire history }
   */
  static async get() {
    const siteHistory = await db.query(
      `SELECT type, item, score
      FROM userHistory`,
    )
    return { history: siteHistory }
  }
}

module.exports = SiteHistory;