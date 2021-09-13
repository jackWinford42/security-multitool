"use strict";

/** Routes for site history database. */

const express = require("express");
const SiteHistory = require("../models/siteHistory");
const { ensureLoggedIn } = require("../middleware/auth");

const router = express.Router();

/** GET / => { siteHistory }
 * 
 * Authorization required: same-user-as-:email
 **/

router.get("/", ensureLoggedIn, async function (req, res, next) {
  try {
    const siteHistory = await SiteHistory.get();
    return res.json(siteHistory);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;