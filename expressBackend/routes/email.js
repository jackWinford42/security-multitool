"use strict";

/** Routes for making a request to the emailrep api. */

const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/:email", async function (req, res, next) {
    try {
        const url = `https://emailrep.io/${req.params.email}?summary=true`;
        //const headers = {Key: }
        const response = await axios({url});
        return response;
    } catch (err) {
        return next(err);
    }
})

module.exports = router;