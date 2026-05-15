import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast"; // Added for notifications

// Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProjectDetails from "./pages/ProjectDetails";

// Components
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      {/* Toaster allows your signup/login success messages to show up */}
      <Toaster position="top-right" /> 
      
      <BrowserRouter>
        <Routes>
          {/* ROOT ROUTE: 
            If you want users to see Login first, leave this as is.
            To see Signup first, change element={<Login />} to element={<Signup />}
          */}
          <Route path="/" element={<Login />} />

          {/* PUBLIC ROUTES */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* PROTECTED ROUTES: Only accessible if logged in */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/projects/:id"
            element={
              <ProtectedRoute>
                <ProjectDetails darkMode={darkMode} setDarkMode={setDarkMode} />
              </ProtectedRoute>
            }
          />

          {/* CATCH-ALL ROUTE: Redirects any unknown URL back to Login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;