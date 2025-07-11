import React from "react"; // Not strictly needed with "jsx": "react-jsx" but good practice for clarity.

import "./index.css";
import ReactDOM from "react-dom/client"; // Import createRoot from react-dom/client for React 18+

import png from "./abcd.png";
import App from "./App";
import home from "./home.svg";

// Get the DOM element where your React app will be mounted.
// It's typically a div with the id 'root' in your public/index.html.
const rootElement = document.getElementById("root");

// Ensure the root element exists before trying to create a root.
// This is a good practice to prevent runtime errors.
if (!rootElement) {
  throw new Error('Root element with ID "root" not found in the DOM.');
}

// Create a React root using the new createRoot API from React 18+.
// The 'as HTMLElement' is a TypeScript type assertion to assure TypeScript that rootElement is indeed an HTMLElement.
const root = ReactDOM.createRoot(rootElement);

// Render your main App component into the React root.
// React.StrictMode is a tool for highlighting potential problems in an application.
// It activates additional checks and warnings for its descendants.
root.render(
  <React.StrictMode>
    <>
      <img src={png} alt="hgjh" />
      <img src={home} alt="hjhgfhg" />
      <p>Sagar Patil</p>
      <App />
    </>
  </React.StrictMode>,
);
