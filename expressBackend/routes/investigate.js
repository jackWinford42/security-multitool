"use strict";

/** Routes for making a request to the emailrep api. */

const express = require("express");
const axios = require("axios");
const { ensureLoggedIn } = require("../middleware/auth");
const SiteHistory = require("../models/siteHistory");
const UserHistory = require("../models/userHistory");

const router = express.Router();

router.post("/", ensureLoggedIn, async function (req, res, next) {
  try {
    const url = `https://ipqualityscore.com/api/json/${req.body.type}/dynV47ZzUaACROaMoVScQXFpslSorfFv/${req.body.investigate}`;
    let response;
    try {
      response = (await axios({url})).data;
    } catch (err) {
      response = {success: false, message: true};
    }
    console.log(response);
    if (response.success) {
      const item = ("email" === req.body.type) ? response.sanitized_email : "https://" + response.domain; 
      let score = ("email" === req.body.type) ? response.fraud_score : response.risk_score;
      score = 100 - score;
      
      await UserHistory.add(req.body.type, item, score, req.body.email);
      if (!(score === 100 && "email" === req.body.type)) await SiteHistory.add(req.body.type, item, score)
    }

    return res.json({data: response});
  } catch (err) {
    return next(err);
  }
})

module.exports = router;
