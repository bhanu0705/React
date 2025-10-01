import "./Style.css";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Snackbar, CircularProgress } from "@mui/material";
import { UserContext } from "./UserContext";

const Login = () => {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/login", {
        email,
        password,
      });

      if (res.data.employee) {
        login(res.data.employee);
        navigate("/");
      } else {
        setSnackMessage("Login failed: Invalid response from server");
        setSnackbarOpen(true);
      }
    } catch (error) {
      let message = "An unexpected error occurred. Please try again.";
      if (error.response) {
        if (error.response.status === 401) {
          message = "Invalid email or password. Please check your credentials.";
        } else if (error.response.status === 500) {
          message = "Server error. Please try again later.";
        } else {
          message = `Login failed: ${error.response.data?.message || "Unknown error"}`;
        }
      } else if (error.request) {
        message = "Network error. Please check your connection.";
      }
      setSnackMessage(message);
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="login-box">
      <h2>Login</h2>
 
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
 
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
 
        <button type="submit" disabled={loading} style={{ minHeight: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {loading ? <CircularProgress size={21} /> : "Login"}
        </button>
 
        <p>
          Don't have an account? <br />
          <Link to="/signup">Sign Up Here</Link>
        </p>
      </form>
 
      <Snackbar
        open={snackbarOpen}
        message={snackMessage}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      />
    </div>
  );
};
 
export default Login;