import React from "react";
import { render } from "@testing-library/react";
import UrlResponse from "./UrlResponse";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils"

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <UrlResponse data={{risk_score: 10, page_size: 1, spamming: false, malware: false, phishing: false, dns_valid: false}}/>
      </UserProvider>
    </MemoryRouter>,
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <UrlResponse data={{risk_score: 10, page_size: 1, spamming: false, malware: false, phishing: false, dns_valid: false}}/>
      </UserProvider>
    </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});