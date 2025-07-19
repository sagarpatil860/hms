import React from "react";

import { render, screen } from "@testing-library/react";

import App from "./App";

describe("App Component", () => {
  test("show text", () => {
    render(<App />);
    const output = screen.queryByText(/Page Not Found/i);
    expect(output).toBeInTheDocument();
  });
});
