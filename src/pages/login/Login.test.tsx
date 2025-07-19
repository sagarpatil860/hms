import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Login from "@pages/login/Login.page";

describe("Login Component UI (userEvent)", () => {
  test("renders title and input fields", () => {
    render(<Login />);
    expect(screen.getByText("Hospital Login")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  test("allows user to type into input fields", async () => {
    render(<Login />);
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");

    await userEvent.type(emailInput, "doctor@hospital.com");
    await userEvent.type(passwordInput, "medsecure");

    expect(emailInput).toHaveValue("doctor@hospital.com");
    expect(passwordInput).toHaveValue("medsecure");
  });
});
