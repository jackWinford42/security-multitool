"use strict";

const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../expressError");
const {
  authenticateJWT,
  ensureLoggedIn,
  sameUser,
} = require("./auth");

const { SECRET_KEY } = require("../config");

const testJwt = jwt.sign({ username: "test", email: "test@test.com" }, SECRET_KEY);
const badJwt = jwt.sign({ username: "test", email: "test@test.com" }, "wrong");


describe("authenticateJWT", function () {
  test("works: via header", function () {
    expect.assertions(2);
    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const req = { headers: { authorization: `Bearer ${testJwt}` } };
    const res = { locals: {} };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({
      user: {
        iat: expect.any(Number),
        username: "test",
        email: "test@test.com",
      },
    });
  });

  test("works: no header", function () {
    expect.assertions(2);
    const req = {};
    const res = { locals: {} };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    authenticateJWT(req, res, next);
    expect(res.locals).toEqual({});
  });
});


describe("ensureLoggedIn", function () {
  test("works", function () {
    expect.assertions(1);
    const req = {};
    const res = { locals: { user: { username: "test", email: "test@test.com" } } };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    ensureLoggedIn(req, res, next);
  });

  test("unauth if no login", function () {
    expect.assertions(1);
    const req = {};
    const res = { locals: {} };
    const next = function (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
    ensureLoggedIn(req, res, next);
  });
});

describe("sameUser", function () {
  test("works: same user", function () {
    expect.assertions(1);
    const req = { params: { email: "test@test.com" } };
    const res = { locals: { user: { username: "test", email: "test@test.com" } } };
    const next = function (err) {
      expect(err).toBeFalsy();
    };
    sameUser(req, res, next);
  });

  test("unauth: mismatch", function () {
    expect.assertions(1);
    const req = { params: { email: "wrong" } };
    const res = { locals: { user: { username: "test", email: "test@test.com" } } };
    const next = function (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
    sameUser(req, res, next);
  });

  test("unauth: if anon", function () {
    expect.assertions(1);
    const req = { params: { email: "test" } };
    const res = { locals: {} };
    const next = function (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    };
    sameUser(req, res, next);
  });
});