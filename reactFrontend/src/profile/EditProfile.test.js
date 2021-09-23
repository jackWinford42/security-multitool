import React from "react";
import { render } from "@testing-library/react";
import EditProfile from "./EditProfile";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../testUtils"

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <EditProfile/>
      </UserProvider>
    </MemoryRouter>,
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <EditProfile/>
      </UserProvider>
    </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});