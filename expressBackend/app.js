"use strict";

/** Express app for ramt. */

const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const investigateRoutes = require("./routes/investigate");
const histRoutes = require("./routes/userHistory");
const siteRoutes = require("./routes/siteHistory");

const morgan = require("morgan");

const app = express();


app.use(cors());

app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

app.use("/uHist", histRoutes);
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/investigate", investigateRoutes);
app.use("/siteHist", siteRoutes);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.log(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;