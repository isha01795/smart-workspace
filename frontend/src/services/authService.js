import api from "./api"

export const signupUser = async (
  userData
) => {

  const response = await api.post(
    "/auth/signup",
    userData
  )

  return response.data
}


export const loginUser = async (
  formData
) => {

  const response = await api.post(
    "/auth/login",
    formData,
    {
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
    }
  )

  return response.data
}