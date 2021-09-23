import React from "react";
import { render } from "@testing-library/react";
import HomeItem from "./reactFrontend/src/common/HomeItem";
import { MemoryRouter } from "react-router";
import { UserProvider } from "./reactFrontend/src/testUtils"

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <UserProvider>
        <HomeItem row={{score: 95, time_created: "1/2/3Tlknasdf", item: "jack@test.com", type: "email", popularity: 4}}/>
      </UserProvider>
    </MemoryRouter>,
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <HomeItem row={{score: 95, time_created: "1/2/3Tlknasdf", item: "jack@test.com", type: "email", popularity: 4}}/>
      </UserProvider>
    </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});