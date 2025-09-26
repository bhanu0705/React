import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";
import Thankyou from "./Thankyou";
import { useContext } from "react";
import { UserContext } from "./UserContext";
 
function App() {
  const { user } = useContext(UserContext);
 
  return (
    <div className="App">
      <Routes>
        <Route
          path="/signup"
          element={!user ? <Registration /> : <Navigate to="/" />}
        />
 
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
 
        <Route
          path="/"
          element={user ? <Thankyou /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}
 
export default App;
 