import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import "../AuthForm.css"; // Add this line for styling

function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const result = login(username, password);
    if (!result.success) {
      setError(result.message);
    } else {
      setError("");
      if (result.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
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
        <div className="auth-title">Sign In</div>
        <form className="auth-form" onSubmit={handleLogin}>
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
          <button type="submit">Continue</button>
          {error && <div className="auth-error">{error}</div>}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            style={{ marginTop: "1rem" }}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
