"use strict";

const request = require("supertest");

const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);


/************************************** GET /uHist/:email */

describe("GET /uHist/:email", function () {
  test("works", async function () {
    const resp = await request(app)
          .get("/uHist/u1@email.com")
          .set("authorization", `Bearer ${u1Token}`)
    expect(resp.body.history.rowCount).toEqual(1)
  })
})

/************************************** DELETE /uHist/:email/dump */

describe("DELETE /uHist/:email/dump", function () {
  test("works", async function () {
    const resp = await request(app)
          .delete("/uHist/u1@email.com/dump")
          .set("authorization", `Bearer ${u1Token}`)
    expect(resp.body).toEqual({ cleared: "u1@email.com's history" })
  })
})