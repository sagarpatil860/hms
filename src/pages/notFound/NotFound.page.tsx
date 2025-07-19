/* eslint-disable no-inline-styles/no-inline-styles */
import React from "react";

/**
 * Not Found Page.
 *
 * Renders an interactive page when no matching route is present.
 *
 *
 * @returns {JSX.Element} This renders not found page for the app.
 */
function NotFound() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
        color: "#333",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "72px", margin: 0 }}>404</h1>
      <p
        style={{ fontSize: "24px", margin: "10px 0" }}
        data-testid="not-found-msg"
      >
        Page Not Found
      </p>
      <a
        href="/dashboard"
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          textDecoration: "none",
          borderRadius: "4px",
        }}
      >
        Go to Home
      </a>
    </div>
  );
}

export default NotFound;
