/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useMemo, useState, type JSX } from "react";

// import { authService } from "@auth/auth.service";

import type {
  AuthContextType,
  User,
  // UserCredentials,
} from "@shared-types/auth.types";

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () =>
    new Promise((res, rej) => {
      return;
    }),
  user: {
    userName: "default",
    role: "admin",
  },
});

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * Auth Provider for storing authorization details
 *
 * @param {Readonly<AuthProviderProps>} props props from app
 * @returns {JSX.Element} This renders children passed with Auth context.
 */
function AuthProvider(props: Readonly<AuthProviderProps>): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // eslint-disable-next-line @typescript-eslint/require-await
  async function login({
    userName,
    password,
  }: {
    userName: string;
    password: string;
  }): Promise<boolean> {
    setUser({ role: "admin", userName: "sagar" });
    setIsAuthenticated(true);
    return false;
  }

  const value = useMemo(
    () => ({ user, isAuthenticated, login }),
    [user, isAuthenticated],
  );
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

export default AuthProvider;
