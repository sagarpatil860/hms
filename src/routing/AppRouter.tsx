import React, { type JSX } from "react";

import { BrowserRouter } from "react-router-dom";

import RouterCore from "@routing/RouterCore";

/**
 * AppRouter component sets up the root routing context for the application
 * using React Router's BrowserRouter. It wraps the core routing logic
 * defined in RouterCore inside BrowserRouter to enable client-side navigation.
 *
 * @returns {JSX.Element} The application routing configuration.
 */
export default function AppRouter(): JSX.Element {
  return (
    <BrowserRouter>
      <RouterCore />
    </BrowserRouter>
  );
}
