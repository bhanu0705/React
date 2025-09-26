// src/context/UserContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
 
export const UserContext = createContext();
 
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(localStorage.getItem("token") || null);
 
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
 
      if (!user) {
        axios
          .get("http://localhost:8080/me")
          .then((res) => {
            setUser(res.data);
            localStorage.setItem("user", JSON.stringify(res.data));
          })
          .catch(() => {
            setUser(null);
            setToken(null);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          });
      }
    }
  }, [token]);
 
  const login = (newToken, userData) => {
    setToken(newToken);
    setUser(userData);
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userData));
    axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
  };
 
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
  };
 
  return (
    <UserContext.Provider value={{ user, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
 