import "./Style.css";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Snackbar } from "@mui/material";
import {UserContext} from "./UserContext";

const Login = () => {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
 
  const navigate = useNavigate();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {
      const res = await axios.post("/login", {
        email,
        password,
      });
 
      if (res.data.employee) {
        // save globally using context
        login(res.data.employee);
        navigate("/"); // redirect home
      } else {
        setSnackMessage("Unexpected response from server");
        setSnackbarOpen(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setSnackMessage("Invalid Email or Password");
      } else {
        setSnackMessage("Unexpected error occurred");
      }
      setSnackbarOpen(true);
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
 
        <button type="submit">Login</button>
 
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