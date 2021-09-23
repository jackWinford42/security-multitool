"use strict";

const db = require("../db");

class SiteHistory {
  /** add history for site with data.
   *
   * Returns { type, item, score }
   **/
  static async add(type, item, score) {
    const exists = await db.query(
      `SELECT item, score, time_created, popularity
      FROM history
      WHERE item = $1`,
      [item]
    )
    if (exists.rowCount > 0) {
      const popularity = exists.rows[0].popularity + 1;
      return (await db.query(
        `UPDATE history SET
        item = $1,
        score = $2,
        popularity = $3
        WHERE item = $1`,
        [
          item,
          score,
          popularity
        ],
      )).rows[0];
    } else {
      return (await db.query(
        `INSERT INTO history 
        (type,
        item,
        score)
        VALUES ($1, $2, $3)`,
        [
          type,
          item,
          score
        ],
      )).rows[0];
    }
  }

  /** get history for the entire site
   * 
   * Returns { history: site's entire history }
   */
  static async get() {
    const siteHistory = await db.query(
      `SELECT 
      type, 
      item, 
      score, 
      time_created, 
      popularity
      FROM history
      ORDER BY time_created DESC
      LIMIT 30`,
    )
    return { history: siteHistory }
  }

  /** get top most popular of all time history
   *  for the entire site
   * 
   * Returns { history: top most popular items }
   */
  static async getTop() {
    const siteHistory = await db.query(
      `SELECT 
      type, 
      item, 
      score, 
      time_created, 
      popularity
      FROM history
      ORDER BY popularity DESC
      LIMIT 10`,
    )
    console.log("Top site history: " + siteHistory)
    return { history: siteHistory }
  }

    /** get top most popular of all time history
   *  for the entire site this past seven days
   * 
   * Returns { history: top ten most popular items this week }
   */
  static async getTopWeek() {
    const siteHistory = await db.query(
      `SELECT 
      type, 
      item, 
      score, 
      time_created, 
      popularity
      FROM history
      WHERE time_created > CURRENT_TIMESTAMP - interval '7' day
      ORDER BY popularity DESC
      LIMIT 10`,
    )
    return { history: siteHistory }
  }
}

module.exports = SiteHistory;