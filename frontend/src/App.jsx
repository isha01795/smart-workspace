import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import {
  useState
} from "react"

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import ProjectDetails from "./pages/ProjectDetails"
import ProtectedRoute from "./routes/ProtectedRoute"


function App() {

  const [darkMode,
  setDarkMode
] = useState(false)

  return (
    <div className={
      darkMode ? "dark" : ""
    }>
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects/:id"
          element={
            <ProtectedRoute>
              <ProjectDetails
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
    </div>
  )
}

export default App