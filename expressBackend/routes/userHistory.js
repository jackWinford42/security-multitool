"use strict";

/** Routes for users. */

const express = require("express");
const SiteHistory = require("../models/siteHistory");
const UserHistory = require("../models/userHistory");

const router = express.Router();

/** DELETE /[email]/dump  =>  { cleared: `${email}'s history` }
 *
 * Authorization required: same-user-as-:email
 **/

router.delete("/:email/dump", async function (req, res, next) {
  try {
    const response = await UserHistory.dump(req.params.email);
    return res.json(response)
  } catch (err) {
    return next(err);
  }
});

/** GET /[email] => { history: userHistory }
 * 
 * Authorization required: same-user-as-:email
 **/

router.get("/:email", async function (req, res, next) {
  try {
    const usersHistory = await UserHistory.get(req.params.email);
    return res.json(usersHistory);
  } catch (err) {
    return next(err);
  }
});

/** POST /[email] => { added: new }
 * 
 * Returns the new history item on success
 * 
 * Authorization required: same-user-as-:email
 */

router.post("/:email", async function (req, res, next) {
  try {
    console.log("req.body: " + req.body)
    const type = ("sanitized_email" in req.body) ? "email" : "url";
    const item = ("sanitized_email" in req.body) ? req.body.sanitized_email : "https://" + req.body.domain; 
    let score = ("sanitized_email" in req.body) ? req.body.fraud_score : req.body.risk_score;
    score = 100 - score;
    await SiteHistory.add(type, item, score)
    const newHistory = await UserHistory.add(type, item, score, req.params.email);
    return res.json(newHistory);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;