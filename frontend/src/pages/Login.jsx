import { useState } from "react"

import {
  loginUser
} from "../services/authService"

import { useNavigate } from "react-router-dom"

function Login() {

  const navigate = useNavigate()

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")


  const handleLogin = async (e) => {

    e.preventDefault()

    try {

      const formData =
        new URLSearchParams()

      formData.append(
        "username",
        email
      )

      formData.append(
        "password",
        password
      )

      const data = await loginUser(
        formData
      )

      localStorage.setItem(
        "token",
        data.access_token
      )

      alert("Login successful")

      navigate("/dashboard")

    } catch (error) {

      console.error(error)

      alert("Login failed")
    }
  }


  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">

      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-96"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded"
        >
          Login
        </button>

      </form>

    </div>
  )
}

export default Login