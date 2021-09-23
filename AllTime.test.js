import React from "react";
import { render } from "@testing-library/react";
import AllTime from "./reactFrontend/src/home/AllTime";
import { MemoryRouter } from "react-router";
import { UserProvider } from "./reactFrontend/src/testUtils"

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <AllTime/>
      </UserProvider>
    </MemoryRouter>,
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <AllTime/>
      </UserProvider>
    </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});