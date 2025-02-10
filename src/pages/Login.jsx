import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import styles from "../styles/Auth.module.css";
import "../styles/Register.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ✅ Define navigate

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        navigate("/dashboard"); // ✅ Redirect to homepage after login
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong. Try again.");
    }
  };

  const handleGuestLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/guest-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        alert(`Logged in as ${data.user.name}`);
        navigate("/dashboard"); // ✅ Navigate after guest login
      } else {
        alert("Guest login failed");
      }
    } catch (error) {
      console.error("Guest Login Error:", error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className={styles.authPage}>
      <div className="register-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className={styles.button} type="submit">Login</button>
        </form>
        <button onClick={handleGuestLogin} className={styles.guestButton}>
          Continue as Guest
        </button>
      </div>
    </div>
  );
  
};

export default Login;
