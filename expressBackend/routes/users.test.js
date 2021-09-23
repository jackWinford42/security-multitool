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

/************************************** GET /users/:email */

describe("GET /users/:email", function () {
  test("works", async function () {
    const resp = await request(app)
          .get("/users/u1@email.com")
          .set("authorization", `Bearer ${u1Token}`)
    expect(resp.body).toEqual({ user: { username: 'u1', email: 'u1@email.com', profile_pic: '' } })
  })
})

/************************************** PATCH /users/:email */

describe("PATCH /users/:email", function () {
  test("works", async function () {
    const resp = await request(app)
          .patch("/users/u1@email.com")
          .send({username: 'u3333', profile_pic: 'abcde'})
          .set("authorization", `Bearer ${u1Token}`)
    console.log(resp.body)
    expect(resp.body).toEqual({ user: { updateData: { username: 'u3333', profile_pic: 'abcde' } } })
  })
})

/************************************** DELETE /users/:email */

describe("DELETE /users/:email", function () {
  test("works", async function () {
    const resp = await request(app)
          .delete("/users/u1@email.com")
          .set("authorization", `Bearer ${u1Token}`)
    expect(resp.body).toEqual({ deleted: "u1@email.com"})
  })
})