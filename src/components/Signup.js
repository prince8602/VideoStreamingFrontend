import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import "../AuthForm.css"; // Make sure this path is correct!

function Signup() {
  const { signup } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Only register users (not admins)
    const result = signup(username, password, "user");
    if (!result.success) {
      setError(result.message);
      setSuccess("");
    } else {
      setError("");
      setSuccess("Signup successful! You can now log in.");
      setTimeout(() => navigate("/login"), 1200);
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-overlay"></div>
      <div className="auth-form-container">
        <img
          className="netflix-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="Netflix"
        />
        <div className="auth-title">User Registration</div>
        <form className="auth-form" onSubmit={handleSignup}>
          <label className="auth-label">Username</label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <label className="auth-label">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
          {error && <div className="auth-error">{error}</div>}
          {success && <div className="auth-success">{success}</div>}
        </form>
      </div>
    </div>
  );
}

export default Signup;
