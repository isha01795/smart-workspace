import { useState } from "react"

import {
  signupUser
} from "../services/authService"

function Signup() {

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")


const handleSignup = async (e) => {

  e.preventDefault()

  try {

    await signup({
      email,
      password
    })

    toast.success(
      "Signup successful"
    )

    navigate("/")

  } catch (error) {

    toast.error(
      "Signup failed"
    )
  }
}

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">

      <form
        onSubmit={handleSignup}
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-96"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Signup
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
          Signup
        </button>

      </form>

    </div>
  )
}

export default Signup