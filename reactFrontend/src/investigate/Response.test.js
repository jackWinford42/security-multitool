import React from "react";
import { render } from "@testing-library/react";
import Response from "./Response";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils"

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <Response data={{fraud_score: 10, overall_score: 1, smtp_score: 1, disposable: false, leaked: false, recent_abuse: false, honeypot: false}}/>
      </UserProvider>
    </MemoryRouter>,
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
      <Response data={{fraud_score: 10, overall_score: 1, smtp_score: 1, disposable: false, leaked: false, recent_abuse: false, honeypot: false}}/>
      </UserProvider>
    </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});