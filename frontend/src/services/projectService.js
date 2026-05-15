import api from "./api"


export const createProject = async (
  projectData
) => {

  const token =
    localStorage.getItem("token")

  const response = await api.post(
    "/projects/",
    projectData,
    {
      headers: {
        Authorization:
          `Bearer ${token}`
      }
    }
  )

  return response.data
}



export const getProjects = async () => {

  const token =
    localStorage.getItem("token")

  const response = await api.get(
    "/projects/",
    {
      headers: {
        Authorization:
          `Bearer ${token}`
      }
    }
  )

  return response.data
}

export const deleteProject =
  async (projectId) => {

    const token =
      localStorage.getItem("token")

    const response = await api.delete(
      `/projects/${projectId}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    )

    return response.data
}