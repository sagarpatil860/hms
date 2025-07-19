import React from "react";

import { render, screen } from "@testing-library/react";

import AppRouter from "@routing/AppRouter";

jest.mock("@routing/RouterCore", () => ({
  __esModule: true,
  default: () => <div data-testid="app-router-test">Mocked Core</div>,
}));

const renderComp = () => {
  return render(<AppRouter />);
};

describe("Not Found Page", () => {
  it("App Router Renders mocked page", () => {
    renderComp();
    const appRouterContent = screen.getByTestId("app-router-test");
    expect(appRouterContent).toBeInTheDocument();
  });
});
