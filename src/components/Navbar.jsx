import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload(); // Refresh to reflect logout
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "#ddd" }}>
      <h2>My App</h2>
      {isAuthenticated ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <a href="/login">Login</a>
      )}
    </nav>
  );
};

export default Navbar;
