import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

describe("App Component", () => {
  test("does not show submitted text before button is clicked", () => {
    render(<App />);
    const output = screen.queryByText(/you typed:/i);
    expect(output).not.toBeInTheDocument();
  });

  test("shows submitted text after button is clicked", async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/enter text here/i);
    const button = screen.getByRole("button", { name: /submit/i });

    await userEvent.type(input, "TypeScript Rocks!");
    await userEvent.click(button);

    const output = screen.getByText(/you typed:/i);
    expect(output).toHaveTextContent("You typed: TypeScript Rocks!");
  });
});
