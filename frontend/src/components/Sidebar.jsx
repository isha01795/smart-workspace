import {
  NavLink,
  useNavigate
} from "react-router-dom"

function Sidebar({
  darkMode,
  setDarkMode
}) {

  const navigate =
    useNavigate()

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    )

    navigate("/")
  }

  return (

    <div className="w-64 bg-white dark:bg-gray-800 shadow-xl min-h-screen p-6">

      <h1 className="text-3xl font-bold mb-10 text-blue-600">

        Smart Workspace

      </h1>


      <div className="flex flex-col gap-4">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `p-3 rounded-xl font-semibold transition ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            }`
          }
        >
          Dashboard
        </NavLink>


        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl transition mt-6"
        >
          Logout
        </button>

        <button
            onClick={() =>
                setDarkMode(
                !darkMode
                )
            }
            className="bg-gray-800 text-white px-4 py-2 rounded-lg w-full"
            >
            {darkMode
                ? "☀ Light"
                : "🌙 Dark"}
            </button>

      </div>

    </div>
  )
}

export default Sidebar