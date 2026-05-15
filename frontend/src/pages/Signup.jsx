import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Essential for navigation
import { signupUser } from "../services/authService";
import { toast } from "react-hot-toast"; // Assuming react-hot-toast

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize hook

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Use the correctly imported function name
      await signupUser({
        email,
        password
      });

      toast.success("Signup successful!");
      
      // After signup, send them to login or dashboard
      navigate("/login"); 

    } catch (error) {
      console.error(error);
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSignup}
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-96"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Signup
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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded transition-colors"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default Signup;