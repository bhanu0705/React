import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";
import Thankyou from "./Thankyou";

function App() {
    const [loggedIn, setLoggedIn]=useState(false);
    return (
        <Router>
        <div className="App">
        <Routes>
                    <Route 
                        path="/signup"
                        element={<Registration />} />
                    <Route
                        path="/login"
                        element={<Login setLoggedIn={setLoggedIn}/>} />
                    <Route
                        path="/"
                        element={loggedIn?<Thankyou setLoggedIn={setLoggedIn} />:<Navigate to="/login"/>} />
                    
        </Routes>
        
        </div>
        </Router>
    );
}

export default App;