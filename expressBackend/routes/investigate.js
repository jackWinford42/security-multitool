"use strict";

/** Routes for making a request to the emailrep api. */

const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/", async function (req, res, next) {
  try {
    console.log(req.body)
    const url = `https://ipqualityscore.com/api/json/${req.body.type}/dynV47ZzUaACROaMoVScQXFpslSorfFv/${req.body.investigate}`;
    console.log(url)
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