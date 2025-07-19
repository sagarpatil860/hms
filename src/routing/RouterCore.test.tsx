import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import useAuth from "@auth/useAuth.hook";
import RouterCore from "@routing/RouterCore";

// Mock useAuth
jest.mock("@auth/useAuth.hook", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock pages used in ROUTE_CONFIG
jest.mock(
  "@pages/login/Login.page",
  () =>
    function Login() {
      return <div>Login Page</div>;
    },
);
jest.mock(
  "@pages/dashboard/Dashboard.page",
  () =>
    function dashboard() {
      return <div>Dashboard Page</div>;
    },
);
jest.mock(
  "@pages/notFound/NotFound.page",
  () =>
    function notFound() {
      return <div>404 Page</div>;
    },
);

// Mock useLocation
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({ pathname: "/dashboard" }),
}));

const renderWithRouter = () =>
  render(
    <MemoryRouter initialEntries={["/dashboard"]}>
      <RouterCore />
    </MemoryRouter>,
  );

describe("RouterCore", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("redirects to login if route is protected and user is not authenticated", () => {
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      user: null,
    });

    renderWithRouter();
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  test("redirects to unauthorized if user lacks proper role", () => {
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: { role: "nurse" }, // role not in [ADMIN, DOCTOR, RECEPTIONIST]
    });

    renderWithRouter();
    expect(screen.queryByText("Dashboard Page")).not.toBeInTheDocument();
    expect(screen.queryByText("Login Page")).not.toBeInTheDocument();
    // Since /unauthorized route is navigated to, you'd mock it similarly if needed
  });

  test("renders dashboard if user is authenticated and role is allowed", () => {
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: { role: "admin" },
    });

    renderWithRouter();
    expect(screen.getByText("Dashboard Page")).toBeInTheDocument();
  });

  test("renders public route without auth (login)", () => {
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      user: null,
    });

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <RouterCore />
      </MemoryRouter>,
    );
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  test("renders fallback route (* → 404)", () => {
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      user: null,
    });

    render(
      <MemoryRouter initialEntries={["/unknown-path"]}>
        <RouterCore />
      </MemoryRouter>,
    );
    expect(screen.getByText("404 Page")).toBeInTheDocument();
  });
});
