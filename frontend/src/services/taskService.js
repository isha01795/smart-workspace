import api from "./api"


export const createTask =
  async (
    projectId,
    taskData
  ) => {

    const token =
      localStorage.getItem("token")

    const response = await api.post(
      `/tasks/${projectId}`,
      taskData,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    )

    return response.data
}



export const getTasks =
  async (projectId) => {

    const token =
      localStorage.getItem("token")

    const response = await api.get(
      `/tasks/${projectId}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    )

    return response.data
}

export const updateTaskStatus =
  async (
    taskId,
    completed
  ) => {

    const token =
      localStorage.getItem("token")

    const response = await api.patch(
      `/tasks/${taskId}`,
      {
        completed
      },
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    )

    return response.data
}

export const deleteTask =
  async (taskId) => {

    const token =
      localStorage.getItem("token")

    const response = await api.delete(
      `/tasks/${taskId}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    )

    return response.data
}

export const updateTask =
  async (
    taskId,
    taskData
  ) => {

    const response =
      await api.patch(
        `/tasks/update/${taskId}`,
        taskData
      )

    return response.data
}