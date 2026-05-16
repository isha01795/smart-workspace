import { useState } from "react"
import { useNavigate, Link } from "react-router-dom" // Added Link here
import { loginUser } from "../services/authService"
import { toast } from "react-hot-toast" // Upgraded from basic browser alerts

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const formData = new URLSearchParams()
      formData.append("username", email)
      formData.append("password", password)

      const data = await loginUser(formData)

      localStorage.setItem("token", data.access_token)

      toast.success("Login successful!") // Clean notification
      navigate("/dashboard")
    } catch (error) {
      console.error(error)
      toast.error("Login failed. Please check your credentials.") // Clean notification
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-96"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          required
          className="w-full border p-3 rounded mb-4 bg-white dark:bg-gray-700 dark:text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="w-full border p-3 rounded mb-4 bg-white dark:bg-gray-700 dark:text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded transition-colors font-medium mb-4"
        >
          Login
        </button>

        {/* New Navigation Section */}
        <div className="text-center mt-4 border-t pt-4 border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link 
              to="/signup" 
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login