import "./App.css";
import { React, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";
import Thankyou from "./Thankyou";
function App() {

    return (
        <Router>
        <div className="App">
        <Routes>
                    <Route 
                        path="/signup"
                        element={<Registration />} />
                    <Route
                        path="/login"
                        element={<Login />} />
                    <Route
                        path="/"
                        element={<Login />} />
                    <Route
                        path="/thankyou"
                        element={<Thankyou />} />
                    
        </Routes>
        
        </div>
        </Router>
    );
}

export default App;