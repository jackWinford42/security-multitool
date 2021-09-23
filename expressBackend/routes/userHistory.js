"use strict";

/** Routes for users. */

const express = require("express");
const { sameUser } = require("../middleware/auth")
const UserHistory = require("../models/userHistory");

const router = express.Router();

/** DELETE /[email]/dump  =>  { cleared: `${email}'s history` }
 *
 * Delete/dump a user's history
 *  
 * Authorization required: same-user-as-:email
 **/

router.delete("/:email/dump", sameUser, async function (req, res, next) {
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

router.get("/:email", sameUser, async function (req, res, next) {
  try {
    const usersHistory = await UserHistory.get(req.params.email);
    return res.json(usersHistory);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;