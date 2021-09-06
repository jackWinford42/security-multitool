"use strict";

/** Routes for making a request to the emailrep api. */

const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/:email", async function (req, res, next) {
  try {
    const url = `https://ipqualityscore.com/api/json/email/dynV47ZzUaACROaMoVScQXFpslSorfFv/${req.params.email}`;
    //const headers = {Key: }
    console.log("/////////////")
    const response = await axios({url});
    console.log(response)
    console.log("/////////////")
    return res.json({data: response.data});
  } catch (err) {
    return next(err);
  }
})

module.exports = router;