import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";
import Thankyou from "./Thankyou";
import { useContext } from "react";
import { UserContext } from "./UserContext";

function App() {
  const { user } = useContext(UserContext);

  // Protected Route component for authenticated users
  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  // Public Route component for unauthenticated users
  const PublicRoute = ({ children }) => {
    return !user ? children : <Navigate to="/" />;
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Registration />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Thankyou />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
 