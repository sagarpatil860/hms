/* eslint-disable jsdoc/require-jsdoc */
import React, { useState, type CSSProperties } from "react";

// import { AuthService } from "@auth/auth.service";
// import useAuth from "@auth/useAuth.hook";

/**
 *
 */

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { login } = useAuth();

  // const handleLogin = () => {
  // const auth = new AuthService();
  // Simulate successful login redirect
  // auth.login({ userName: email, password, role: "admin" });
  // if (login({ userName: email, password })) void navigate("/dashboard");
  // };

  const styles: Record<string, CSSProperties> = {
    container: {
      width: "300px",
      margin: "100px auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      fontFamily: "Arial, sans-serif",
    },
    input: {
      display: "block",
      width: "100%",
      padding: "10px",
      marginBottom: "12px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      fontSize: "14px",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#1976d2",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      fontWeight: "bold",
      cursor: "pointer",
    },
    link: {
      display: "block",
      marginTop: "10px",
      textAlign: "center",
      color: "#1976d2",
      cursor: "pointer",
      fontSize: "13px",
    },
    title: {
      textAlign: "center",
      fontSize: "18px",
      marginBottom: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>Hospital Login</div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        style={styles.input}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        style={styles.input}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button style={styles.button}>Login</button>
    </div>
  );
}

export default Login;
