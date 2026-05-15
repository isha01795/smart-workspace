import {
  useEffect,
  useState
} from "react"

import {
  useParams
} from "react-router-dom"

import {
  createTask,
  getTasks,
  deleteTask,
  updateTask
} from "../services/taskService"

import toast from "react-hot-toast"

import Sidebar from "../components/Sidebar"


function ProjectDetails({
  darkMode,
  setDarkMode
}) {

  const { id } = useParams()

  const [title, setTitle] =
    useState("")

  const [priority, setPriority] =
    useState("Medium")

  const [dueDate, setDueDate] =
    useState("")

  const [search, setSearch] =
    useState("")

  const [filterStatus, setFilterStatus] =
    useState("All")

  const [filterPriority, setFilterPriority] =
    useState("All")

  const [description,
    setDescription
  ] = useState("")

  const [tasks, setTasks] =
    useState([])

  const [editingTask,
    setEditingTask
  ] = useState(null)

  const [editTitle,
    setEditTitle
  ] = useState("")

  const [editDescription,
    setEditDescription
  ] = useState("")

  const [editPriority,
    setEditPriority
  ] = useState("Medium")

  const [editDueDate,
    setEditDueDate
  ] = useState("")

  const [sortBy, setSortBy] =
    useState("Newest")


  const loadTasks = async () => {

    try {

      const data =
        await getTasks(id)

      setTasks(data)

    } catch (error) {

      console.error(error)
    }
  }


  useEffect(() => {

    loadTasks()

  }, [])


  const handleCreateTask =
    async (e) => {

      e.preventDefault()

      try {

        await createTask(
          id,
          {
            title,
            description,
            priority,
            due_date:
              dueDate || null
          }
        )

        toast.success(
          "Task created"
        )

        setTitle("")
        setDescription("")
        setPriority("Medium")
        setDueDate("")

        loadTasks()

      } catch (error) {

        console.error(error)

        toast.error(
          "Task creation failed"
        )
      }
    }


  const handleDeleteTask =
    async (taskId) => {

      try {

        await deleteTask(taskId)

        toast.success(
          "Task deleted"
        )

        loadTasks()

      } catch (error) {

        console.error(error)

        toast.error(
          "Delete failed"
        )
      }
    }


  const handleToggleComplete =
    async (task) => {

      try {

        await updateTask(
          task.id,
          {
            completed:
              !task.completed
          }
        )

        loadTasks()

        toast.success(
          "Task updated"
        )

      } catch (error) {

        console.error(error)

        toast.error(
          "Update failed"
        )
      }
    }


  const handleEditTask =
    (task) => {

      setEditingTask(task)

      setEditTitle(task.title)

      setEditDescription(
        task.description || ""
      )

      setEditPriority(
        task.priority || "Medium"
      )

      setEditDueDate(
        task.due_date || ""
      )
    }


  const handleSaveEdit =
    async () => {

      try {

        await updateTask(
          editingTask.id,
          {
            title: editTitle,
            description:
              editDescription,
            priority:
              editPriority,
            due_date:
              editDueDate || null
          }
        )

        toast.success(
          "Task updated"
        )

        setEditingTask(null)

        loadTasks()

      } catch (error) {

        console.error(error)

        toast.error(
          "Update failed"
        )
      }
    }


  const completedTasks =
    tasks.filter(
      (task) => task.completed
    ).length

  const pendingTasks =
    tasks.length -
    completedTasks


  const filteredTasks =
    tasks
      .filter((task) => {

        const matchesSearch =
          task.title
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )

        const matchesStatus =
          filterStatus === "All"
          ||
          (
            filterStatus === "Completed"
            && task.completed
          )
          ||
          (
            filterStatus === "Pending"
            && !task.completed
          )

        const matchesPriority =
          filterPriority === "All"
          ||
          task.priority ===
          filterPriority

        return (
          matchesSearch &&
          matchesStatus &&
          matchesPriority
        )

      })

      .sort((a, b) => {

        if (
          sortBy === "Newest"
        ) {

          return b.id - a.id
        }

        if (
          sortBy === "Oldest"
        ) {

          return a.id - b.id
        }

        if (
          sortBy ===
          "HighPriority"
        ) {

          const order = {
            High: 1,
            Medium: 2,
            Low: 3
          }

          return (
            order[a.priority]
            -
            order[b.priority]
          )
        }

        if (
          sortBy ===
          "DueDate"
        ) {

          if (!a.due_date)
            return 1

          if (!b.due_date)
            return -1

          return new Date(
            a.due_date
          ) - new Date(
            b.due_date
          )
        }

        return 0

      })


  return (

    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">

      <Sidebar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="flex-1 p-10">

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md mb-8 flex flex-col md:flex-row gap-4">

  <input
    type="text"
    placeholder="Search tasks..."
    className="border p-3 rounded-lg flex-1 dark:bg-gray-900 dark:text-white"
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
  />


  <select
    className="border p-3 rounded-lg dark:bg-gray-900 dark:text-white"
    value={filterStatus}
    onChange={(e) =>
      setFilterStatus(
        e.target.value
      )
    }
  >

    <option value="All">
      All Status
    </option>

    <option value="Completed">
      Completed
    </option>

    <option value="Pending">
      Pending
    </option>

  </select>


  <select
    className="border p-3 rounded-lg dark:bg-gray-900 dark:text-white"
    value={filterPriority}
    onChange={(e) =>
      setFilterPriority(
        e.target.value
      )
    }
  >

    <option value="All">
      All Priority
    </option>

    <option value="High">
      High
    </option>

    <option value="Medium">
      Medium
    </option>

    <option value="Low">
      Low
    </option>

  </select>

</div>


{filteredTasks.length === 0 ? (

  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-10 text-center">

    <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
      No Tasks Found
    </h2>

    <p className="text-gray-500">
      Create your first task 🚀
    </p>

  </div>

) : (

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

    {filteredTasks.map((task) => (

      <div
        key={task.id}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-2xl transition border border-gray-100 dark:border-gray-700"
      >

        <div className="flex justify-between items-center mb-4">

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {task.title}
          </h2>

          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              task.completed
                ? "bg-green-100 text-green-700"
                : "bg-orange-100 text-orange-600"
            }`}
          >
            {task.completed
              ? "Completed"
              : "Pending"}
          </span>

        </div>


        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {task.description}
        </p>


        <div className="flex gap-3 mb-4 flex-wrap">

          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              task.priority === "High"
                ? "bg-red-100 text-red-600"
                : task.priority === "Medium"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-600"
            }`}
          >

            {task.priority} Priority

          </span>


          {task.due_date && (

            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">

              Due: {task.due_date}

            </span>

          )}

        </div>


        <div className="flex gap-3 flex-wrap">

          <button
            onClick={() =>
              handleToggleComplete(task)
            }
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Toggle
          </button>


          <button
            onClick={() =>
              handleEditTask(task)
            }
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Edit
          </button>


          <button
            onClick={() =>
              handleDeleteTask(task.id)
            }
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Delete
          </button>

        </div>

      </div>

    ))}

  </div>

)}


{editingTask && (

  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-lg">

      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Edit Task
      </h2>

      <input
        type="text"
        className="w-full border p-3 rounded-lg mb-4 dark:bg-gray-900 dark:text-white"
        value={editTitle}
        onChange={(e) =>
          setEditTitle(e.target.value)
        }
      />


      <textarea
        className="w-full border p-3 rounded-lg mb-4 dark:bg-gray-900 dark:text-white"
        value={editDescription}
        onChange={(e) =>
          setEditDescription(e.target.value)
        }
      />


      <select
        className="w-full border p-3 rounded-lg mb-4 dark:bg-gray-900 dark:text-white"
        value={editPriority}
        onChange={(e) =>
          setEditPriority(e.target.value)
        }
      >

        <option value="High">
          High
        </option>

        <option value="Medium">
          Medium
        </option>

        <option value="Low">
          Low
        </option>

      </select>


      <input
        type="date"
        className="w-full border p-3 rounded-lg mb-6 dark:bg-gray-900 dark:text-white"
        value={editDueDate}
        onChange={(e) =>
          setEditDueDate(e.target.value)
        }
      />


      <div className="flex gap-4">

        <button
          onClick={handleSaveEdit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          Save
        </button>


        <button
          onClick={() =>
            setEditingTask(null)
          }
          className="bg-gray-300 hover:bg-gray-400 px-5 py-2 rounded-lg"
        >
          Cancel
        </button>

      </div>

    </div>

  </div>

)}

        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-3xl shadow-xl mb-10">

          <h1 className="text-4xl font-bold mb-3">
            Project Workspace 🚀
          </h1>

          <p className="text-lg opacity-90">
            Organize tasks efficiently
          </p>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
            <h2 className="text-gray-500">
              Total Tasks
            </h2>

            <p className="text-4xl font-bold text-gray-900 dark:text-white mt-2">
              {tasks.length}
            </p>
          </div>


          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
            <h2 className="text-gray-500">
              Completed
            </h2>

            <p className="text-4xl font-bold text-green-600 mt-2">
              {completedTasks}
            </p>
          </div>


          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
            <h2 className="text-gray-500">
              Pending
            </h2>

            <p className="text-4xl font-bold text-orange-500 mt-2">
              {pendingTasks}
            </p>
          </div>

        </div>


        <form
          onSubmit={handleCreateTask}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md mb-10"
        >

          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Create Task
          </h2>

          <input
            type="text"
            placeholder="Task Title"
            className="w-full border p-3 rounded-lg mb-4 dark:bg-gray-900 dark:text-white"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <textarea
            placeholder="Task Description"
            className="w-full border p-3 rounded-lg mb-4 dark:bg-gray-900 dark:text-white"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />

          <select
            className="w-full border p-3 rounded-lg mb-4 dark:bg-gray-900 dark:text-white"
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value)
            }
          >

            <option value="High">
              High Priority
            </option>

            <option value="Medium">
              Medium Priority
            </option>

            <option value="Low">
              Low Priority
            </option>

          </select>

          <input
            type="date"
            className="w-full border p-3 rounded-lg mb-4 dark:bg-gray-900 dark:text-white"
            value={dueDate}
            onChange={(e) =>
              setDueDate(e.target.value)
            }
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
          >
            Create Task
          </button>

        </form>

      </div>

    </div>
  )
}

export default ProjectDetails