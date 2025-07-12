import React, { useState, type ChangeEvent, type JSX } from "react";

/**
 * Main application component.
 *
 * Renders an interactive form that allows users to type a value and submit it.
 * Displays the submitted value below the form.
 *
 * @returns {JSX.Element} The rendered user interface for the app.
 */
function App(): JSX.Element {
  const [inputValue, setInputValue] = useState<string>("");
  const [submittedText, setSubmittedText] = useState<string>("");

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    setInputValue(e.target.value);
  }

  function handleSubmit(): void {
    setSubmittedText(inputValue);
  }

  return (
    // eslint-disable-next-line no-inline-styles/no-inline-styles
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h2>Type Something 👇</h2>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter text here"
        // eslint-disable-next-line no-inline-styles/no-inline-styles
        style={{ padding: "0.5rem", fontSize: "1rem", marginRight: "1rem" }}
      />

      <button
        onClick={handleSubmit}
        // eslint-disable-next-line no-inline-styles/no-inline-styles
        style={{ padding: "0.5rem 1rem", fontSize: "1rem" }}
      >
        Submit
      </button>
      {submittedText && (
        // eslint-disable-next-line no-inline-styles/no-inline-styles
        <p style={{ marginTop: "1rem", fontSize: "1.2rem" }}>
          You typed: <strong>{submittedText}</strong>
        </p>
      )}
    </div>
  );
}

export default App;
