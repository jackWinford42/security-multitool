"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");

const { authenticateJWT, ensureLoggedIn, sameUser } = require("../middleware/auth")
const express = require("express");
const { BadRequestError } = require("../expressError");
const User = require("../models/users");
const userUpdateSchema = require("../schemas/userUpdate.json");
const UserHistory = require("../models/userHistory");

const router = express.Router();


/** GET /[email] => { user }
 *
 * Returns { email, username, profile_pic }
 *
 * Authorization required: same user-as-:email
 **/

router.get("/:email", authenticateJWT, sameUser, async function (req, res, next) {
  try {
    const user = await User.get(req.params.email);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});


/** PATCH /[email] { user } => { user }
 *
 * Data can include:
 *   { email, email }
 *
 * Returns { email, email }
 *
 * Authorization required: same-user-as-:email
 **/

router.patch("/:email", sameUser, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const user = await User.update(req.params.email, req.body);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});


/** DELETE /[email]  =>  { deleted: email }
 *
 * Authorization required: same-user-as-:email
 **/

router.delete("/:email", sameUser, async function (req, res, next) {
  try {
    const response = await User.remove(req.params.email);
    return res.json(response);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;