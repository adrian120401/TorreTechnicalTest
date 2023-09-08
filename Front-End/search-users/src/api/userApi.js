import axios from 'axios'

const BASE_URL = `http://localhost:3000/api/`

const getUsers = async (searchTerm) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${searchTerm}`)
      return response.data
    } catch (error) {
      throw error
    }
  }

export {getUsers}