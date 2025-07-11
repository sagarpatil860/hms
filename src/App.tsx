import type { ChangeEvent, JSX } from "react";
import React, { useState } from "react";

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
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h2>Type Something 👇</h2>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter text here"
        style={{ padding: "0.5rem", fontSize: "1rem", marginRight: "1rem" }}
      />
      <button
        onClick={handleSubmit}
        style={{ padding: "0.5rem 1rem", fontSize: "1rem" }}
      >
        Submit
      </button>
      {submittedText && (
        <p style={{ marginTop: "1rem", fontSize: "1.2rem" }}>
          You typed: <strong>{submittedText}</strong>
        </p>
      )}
    </div>
  );
}

export default App;
