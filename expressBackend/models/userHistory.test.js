"use strict";

const db = require("../db.js");
const UserHistory = require("./userHistory.js");
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
    const uHistory = await UserHistory.add("email", "another@email.com", 42, "u1@email.com")
    expect(uHistory).toEqual({
      type: "email",
      item: "another@email.com",
      score: 42,
      email: "u1@email.com",
    })
  })
});

/************************************** get */

describe("get", function () {
  test("works", async function () {
    await UserHistory.add("email", "another@email.com", 42, "u1@email.com")
    const uHistory = await UserHistory.get("u1@email.com")
    expect(uHistory.history.rows.length).toEqual(2)
  })
});

/************************************** dump */

describe("dump", function () {
  test("works", async function () {
    const dumped = await UserHistory.dump("u1@email.com")
    expect(dumped).toEqual({ cleared: "u1@email.com's history" })
  })
})