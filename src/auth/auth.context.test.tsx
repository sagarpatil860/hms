// AuthProvider.test.tsx
import React, { useContext } from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AuthProvider, { AuthContext } from "@auth/Auth.context";
import useAuth from "@auth/useAuth.hook";

function TestConsumer() {
  const { isAuthenticated, user, login } = useAuth();

  return (
    <div>
      <span data-testid="auth-status">
        {isAuthenticated ? "Logged In" : "Logged Out"}
      </span>
      <span data-testid="username">{user?.userName ?? "Guest"}</span>
      <button
        data-testid="login-button"
        onClick={() => void login({ userName: "demo", password: "demo" })}
      >
        Trigger Login
      </button>
    </div>
  );
}

function AuthContextConsumer() {
  const { isAuthenticated, user, login } = useContext(AuthContext);

  return (
    <div>
      <span data-testid="auth-status">
        {isAuthenticated ? "Logged In" : "Logged Out"}
      </span>
      <span data-testid="username">{user?.userName}</span>
      <button
        data-testid="login-button"
        onClick={() => {
          // Handle default login stub
          const result = login({ userName: "demo", password: "demo" });
          expect(result).toBe(undefined);
          expect(result).toBeInstanceOf(Promise); // Verify it's a Promise
        }}
      >
        Test Default Login
      </button>
    </div>
  );
}

const renderComp = () => {
  render(
    <AuthProvider>
      <TestConsumer />
    </AuthProvider>,
  );
};

describe("Tests Auth provider context and component", () => {
  it("Renders with default", async () => {
    renderComp();
    expect(screen.getByTestId("auth-status").textContent).toBe("Logged Out");
    await userEvent.click(screen.getByTestId("login-button"));
    expect(screen.getByTestId("auth-status").textContent).toBe("Logged In");
  });
  it("should expose default context props", async () => {
    render(<AuthContextConsumer />);

    expect(screen.getByTestId("auth-status")).toHaveTextContent("Logged Out");
    await userEvent.click(screen.getByTestId("login-button"));
    expect(screen.getByTestId("username")).toHaveTextContent("default");
  });
});
