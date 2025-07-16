import React, { type JSX } from "react";

import AuthProvider from "@auth/Auth.context";
import AppRouter from "@routing/AppRouter";

/**
 * Main application component.
 *
 * Renders an interactive form that allows users to type a value and submit it.
 * Displays the submitted value below the form.
 *
 * @returns {JSX.Element} The rendered user interface for the app.
 */
function App(): JSX.Element {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
