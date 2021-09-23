import React from "react";
import { render } from "@testing-library/react";
import Email from "./Email";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils"

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <Email/>
      </UserProvider>
    </MemoryRouter>,
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <Email/>
      </UserProvider>
    </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});