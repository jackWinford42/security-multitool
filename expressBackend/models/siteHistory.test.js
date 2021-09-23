"use strict";

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");
const db = require("../db.js");
const SiteHistory = require("./siteHistory.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** add */

describe("add", function () {
  test("works", async function () {
    const uHistory = await SiteHistory.add("email", "another@email.com", 42)
    expect(uHistory).toEqual(undefined)
  })
});

/************************************** get */

describe("get", function () {
  test("works", async function () {
    const uHistory = await SiteHistory.get("u1@email.com")
    expect(uHistory.history.rows.length).toEqual(2)
  })
});

/************************************** getTop */

describe("getTop", function () {
  test("works", async function () {
    const uHistory = await SiteHistory.getTop("u1@email.com")
    expect(uHistory.history.rows.length).toEqual(2)
  })
});

/************************************** getTopWeek */

describe("getTopWeek", function () {
  test("works", async function () {
    const uHistory = await SiteHistory.getTopWeek("u1@email.com")
    expect(uHistory.history.rows.length).toEqual(2)
  })
});