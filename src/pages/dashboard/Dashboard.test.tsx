import React from "react";

import { render, screen } from "@testing-library/react";

import Dashboard from "@pages/dashboard/Dashboard.page";

const renderComp = () => {
  return render(<Dashboard />);
};

describe("Dashboard Page", () => {
  it("Renders page with message", () => {
    renderComp();
    const notFoundMsg = screen.getByTestId("dashboard-test-id");
    expect(notFoundMsg).toBeInTheDocument();
  });
});
