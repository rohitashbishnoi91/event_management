import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Register.css"; // Import CSS for styling

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // ✅ Extract correct fields from formData
    const { name, email, password, confirmPassword } = formData;
  
    // ✅ Ensure all fields are filled
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }
  
    // ✅ Ensure passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username: name,  // ✅ Send 'name' as 'username'
        email,
        password,
      });
  
      console.log("User Registered:", res.data);
      navigate("/login"); // ✅ Redirect to login after successful registration
    } catch (error) {
      console.error("Registration Error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Registration failed");
    }
  };
  
  

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default Register;
