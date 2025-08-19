import "./App.css";
import { React, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";
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
        </Routes>
        
        </div>
        </Router>
    );
}

export default App;