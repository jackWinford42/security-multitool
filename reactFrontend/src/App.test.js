import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { UserProvider } from "./testUtils"

it("renders without crashing", function() {
  render(
    <UserProvider>
      <App />
    </UserProvider>
  );
});