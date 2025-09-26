import React from "react";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import "./Thankyou.css";
 
function Thankyou() {
  const { user, logout } = useContext(UserContext);
 
  return (
    <div className="thank-you-container">
      <button id="sign-out" onClick={logout}>
        Sign Out
      </button>
 
      <div className="thank-you">
        {user ? `Welcome ${user.firstName} ${user.lastName}` : "Welcome!"}
      </div>
    </div>
  );
}
 
export default Thankyou;
 