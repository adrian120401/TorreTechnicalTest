import axios from 'axios'

const BASE_URL = `https://torre-test-adrian.azurewebsites.net/api/`

const getPreviewUsersRequest = async (searchTerm) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/preview/${searchTerm}`)
      return response.data
    } catch (error) {
      throw error
    }
  }

const getUsersByQueryRequest = async(query, page) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/search?query=${query}&page=${page}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export {getPreviewUsersRequest, getUsersByQueryRequest}