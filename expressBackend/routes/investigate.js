"use strict";

/** Routes for making a request to the emailrep api. */

const express = require("express");
const axios = require("axios");
const { ensureLoggedIn } = require("../middleware/auth");

const router = express.Router();

router.post("/", ensureLoggedIn, async function (req, res, next) {
  try {
    const url = `https://ipqualityscore.com/api/json/${req.body.type}/dynV47ZzUaACROaMoVScQXFpslSorfFv/${req.body.investigate}`;
    const response = await axios({url});
    return res.json({data: response.data});
  } catch (err) {
    return next(err);
  }
})

module.exports = router;