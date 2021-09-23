import React from "react";
import { render } from "@testing-library/react";
import Profile from "./Profile";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils"

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <Profile/>
      </UserProvider>
    </MemoryRouter>,
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <Profile/>
      </UserProvider>
    </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});