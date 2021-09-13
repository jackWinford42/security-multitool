"use strict";

/** Routes for site history database. */

const express = require("express");
const SiteHistory = require("../models/siteHistory");

const router = express.Router();

/** GET /[email] => { history: userHistory }
 * 
 * Authorization required: same-user-as-:email
 **/

router.get("/", async function (req, res, next) {
  try {
    const siteHistory = await SiteHistory.get();
    return res.json(siteHistory);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;