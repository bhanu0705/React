import { Link } from "react-router-dom";
import "./Thankyou.css";
import { React, useState } from "react";

function Thankyou({setLoggedIn}) {
    const handleLogout=()=>{
        localStorage.setItem("loggedIn","false");
        setLoggedIn(false);
    }
    return (
        <>
        <Link to="/login"><button id="sign-out" onClick={handleLogout}>Signout</button></Link>
        <div class="thank-you">Thank You</div>
        </>
    );
}

export default Thankyou;