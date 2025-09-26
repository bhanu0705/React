import { createContext, useState, useEffect } from "react";
 
export const UserContext = createContext(null);
 
export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
 
  useEffect(() => {
    // On app load, check if token exists
    const token = localStorage.getItem("token");
    if (token) {
      // Fetch user info from backend
      fetch("/api/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(() => setUser(null));
    }
  }, []);
 
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}