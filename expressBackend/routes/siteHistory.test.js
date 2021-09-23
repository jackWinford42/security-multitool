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


/************************************** POST /siteHist/:range */

describe("GET /siteHist/:range", function () {
  test("works", async function () {
    const resp = await request(app)
          .get("/siteHist/all")
          .set("authorization", `Bearer ${u1Token}`)
    expect(resp.body.history.rowCount).toEqual(2)
  })
})