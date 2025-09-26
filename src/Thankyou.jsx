import { Link } from "react-router-dom";
import "./Thankyou.css";
import { React, useState } from "react";

function Thankyou({handleLogout}) {
    
    const [name,setName]=useState("Bhanu");
    return (
        <>
        <Link to="/login"><button id="sign-out" onClick={handleLogout}>Signout</button></Link>
        <div className="thank-you">
            Welcome {name}
        </div>
        </>
    );
}

export default Thankyou;