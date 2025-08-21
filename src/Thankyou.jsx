import { Link } from "react-router-dom";
import "./Thankyou.css";
import { React, useState } from "react";

function Thankyou({handleLogout}) {
    
    return (
        <>
        <Link to="/login"><button id="sign-out" onClick={handleLogout}>Signout</button></Link>
        <div className="thank-you">Thank You</div>
        </>
    );
}

export default Thankyou;