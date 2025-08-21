import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";
import Thankyou from "./Thankyou";

function App() {
    const [loggedIn, setLoggedIn]=useState(localStorage.getItem("loggedIn")==="true");
    const navigate= useNavigate();

    const handleLogin=()=>{
        setLoggedIn(true);
        localStorage.setItem("loggedIn","true");
        navigate("/");
    }
    const handleLogout=()=>{
        setLoggedIn(false);
        localStorage.removeItem("loggedIn");
    }
    const checkLoginStatus=()=>{
        setLoggedIn(localStorage.getItem("loggedIn")==="true");
    }

    useEffect(()=>{
        checkLoginStatus();
    },[]);

    return (
        <div className="App">
        <Routes>
            <Route 
                path="/signup"
                element={loggedIn?<Navigate to="/" />:<Registration onLogin={handleLogin}/>} />
            <Route
                path="/login"
                element={loggedIn?<Navigate to="/" />:<Login onLogin={handleLogin} />} />
            <Route
                path="/"
                element={loggedIn?<Thankyou handleLogout={handleLogout} />:<Navigate to="/login"/>} />
                    
        </Routes>
        
        </div>
    );
}

export default App;