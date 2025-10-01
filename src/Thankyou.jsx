import React, { useState } from "react";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import { CircularProgress } from "@mui/material";
import "./Thankyou.css";

function Thankyou() {
  const { user, logout } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="thank-you-container">
      <button id="sign-out" onClick={handleLogout} disabled={loading} style={{ minHeight: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {loading ? <CircularProgress size={21} /> : "Sign Out"}
      </button>

      <div className="thank-you">
        {user ? `Welcome ${user.firstName} ${user.lastName}` : "Welcome!"}
      </div>
    </div>
  );
}

export default Thankyou;
 