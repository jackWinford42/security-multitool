import React from "react";
import { render } from "@testing-library/react";
import Landing from "./Landing";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils"

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <Landing/>
      </UserProvider>
    </MemoryRouter>,
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <Landing/>
      </UserProvider>
    </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});