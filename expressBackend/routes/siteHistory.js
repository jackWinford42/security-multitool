"use strict";

/** Routes for site history database. */

const express = require("express");
const SiteHistory = require("../models/siteHistory");
const { ensureLoggedIn } = require("../middleware/auth");

const router = express.Router();

/** GET / => { siteHistory }
 * 
 * Authorization required: user must be logged in 
 **/

router.get("/:range", ensureLoggedIn, async function (req, res, next) {
  try {
    let history;
    if (req.params.range === "all") history = await SiteHistory.get();
    else if (req.params.range === "allTime") history = await SiteHistory.getTop();
    else history = await SiteHistory.getTopWeek();
    return res.json(history);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;