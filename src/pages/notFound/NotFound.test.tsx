import React from "react";

import { render, screen } from "@testing-library/react";

import NotFound from "@pages/notFound/NotFound.page";

const renderComp = () => {
  return render(<NotFound />);
};

describe("Not Found Page", () => {
  it("Renders page with message", () => {
    renderComp();
    const notFoundMsg = screen.getByTestId("not-found-msg");
    expect(notFoundMsg).toBeInTheDocument();
  });
});
