import "./Style.css";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Snackbar, CircularProgress } from "@mui/material";
import axios from "axios";
import { UserContext } from "./UserContext";

function Registration() {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setSnackMessage("Passwords do not match!");
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("/register", {
        firstName,
        lastName,
        email,
        password,
      });

      if (res.data.employee) {
        login(res.data.employee);
        navigate("/");
      } else {
        setSnackMessage("Registration successful! Please log in.");
        setSnackbarOpen(true);
      }
    } catch (error) {
      let message = "An unexpected error occurred. Please try again.";
      if (error.response) {
        if (error.response.status === 409) {
          message = "An account with this email already exists.";
        } else if (error.response.status === 400) {
          message = "Invalid input. Please check your details.";
        } else if (error.response.status === 500) {
          message = "Server error. Please try again later.";
        } else {
          message = `Registration failed: ${error.response.data?.message || "Unknown error"}`;
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
    <div className="signup-box">
      <h2>Sign Up</h2>
      <p>It's free and only takes a minute</p>
 
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
 
        <div className="input-group">
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
 
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
 
        <div className="input-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
 
        <button type="submit" disabled={loading} style={{ minHeight: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {loading ? <CircularProgress size={21} /> : "Sign Up"}
        </button>
 
        <p className="terms">
          <a href="#">Terms and Conditions</a> and By clicking Sign Up, you
          agree to our <a href="#">Privacy Policy</a>
        </p>
 
        <p className="login-link">
          Already have an account? <Link to="/login">Login Here</Link>
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
}
 
export default Registration;
 