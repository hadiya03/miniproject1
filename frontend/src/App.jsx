/*import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";

const App = () => {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      
      <Navbar />

    
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(to bottom right, #9be8e8, #b9d0ff)",
        }}
      >
        <Routes>
          <Route path="/l" element={<Login />} />
          <Route path="/s" element={<Signup />} />
          <Route path="*" element={<Navigate to="/l" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;*/


import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard"; // import dashboard

const App = () => {
  // ProtectedRoute component to check if user is logged in
  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return <Navigate to="/l" replace />; // redirect to login if not logged in
    }
    return children;
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Navbar on top */}
      <Navbar />

      {/* Main content fills remaining screen */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(to bottom right, #9be8e8, #b9d0ff)",
        }}
      >
        <Routes>
          <Route path="/l" element={<Login />} />
          <Route path="/s" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/l" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

