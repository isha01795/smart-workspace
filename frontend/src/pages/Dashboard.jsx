import { useEffect, useState } from "react"

import {
  useNavigate,
  Link
} from "react-router-dom"

import Sidebar from "../components/Sidebar"

import {
  createProject,
  getProjects,
  deleteProject
} from "../services/projectService"

import toast from "react-hot-toast"


function Dashboard({
  darkMode,
  setDarkMode
}) {

  const [name, setName] =
    useState("")

  const [description,
    setDescription
  ] = useState("")

  const [projects,
    setProjects
  ] = useState([])

  const navigate = useNavigate()


  const loadProjects = async () => {

    try {

      const data =
        await getProjects()

      setProjects(data)

    } catch (error) {

      console.error(error)

      toast.error(
        "Failed to load projects"
      )
    }
  }


  useEffect(() => {

    loadProjects()

  }, [])


  const handleLogout = () => {

    localStorage.removeItem("token")

    navigate("/")
  }


  const handleCreateProject =
    async (e) => {

      e.preventDefault()

      try {

        await createProject({
          name,
          description,
        })

        toast.success(
          "Project created successfully"
        )

        setName("")
        setDescription("")

        loadProjects()

      } catch (error) {

        console.error(error)

        toast.error(
          "Project creation failed"
        )
      }
    }


  const handleDeleteProject =
    async (projectId) => {

      try {

        await deleteProject(
          projectId
        )

        loadProjects()

        toast.success(
          "Project deleted"
        )

      } catch (error) {

        console.error(error)

        toast.error(
          "Delete failed"
        )
      }
    }


  const totalProjects =
    projects.length


  return (

    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">

      <Sidebar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        />

      <div className="flex-1 p-10">

        <div className=" mb-8">

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">

            <h2 className="text-gray-500 text-lg">
              Total Projects
            </h2>

            <p className="text-4xl font-bold text-gray-900 dark:text-white mt-2">
              {totalProjects}
            </p>

          </div>


          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">

            <h2 className="text-gray-500 text-lg">
              Workspace Status
            </h2>

            <p className="text-2xl font-bold mt-2 text-green-600">
              Active
            </p>

          </div>


          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">

            <h2 className="text-gray-500 text-lg">
              Productivity
            </h2>

            <p className="text-2xl font-bold mt-2 text-blue-600">
              Growing 🚀
            </p>

          </div>

        </div>


        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-3xl mb-10 shadow-xl">

          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to Smart Workspace 🚀
          </h2>

          <p className="text-lg opacity-90">
            Manage projects, track tasks, and boost productivity with your personal workspace.
          </p>

        </div>


        <form
          onSubmit={handleCreateProject}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md mb-10 max-w-lg"
        >

          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Create Project
            </h2>

          <input
            type="text"
            placeholder="Project Name"
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-3 rounded-lg mb-4"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <textarea
            placeholder="Description"
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-3 rounded-lg mb-4"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
          >
            Create Project
          </button>

        </form>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {projects.map((project) => (

            <div key={project.id}>

              <div
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition duration-300 border border-gray-100 dark:border-gray-700"
              >

                <Link
                  to={`/projects/${project.id}`}
                >

                  <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                    {project.name}
                  </h2>

                  <p className="text-gray-600 dark:text-gray-300">
                    {project.description}
                  </p>

                </Link>

                <button
                  onClick={() =>
                    handleDeleteProject(
                      project.id
                    )
                  }
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}

export default Dashboard