
import axios from 'axios'
const API_URL = 'http://localhost:5000/api/admin/'

const login = async (admin) => {
    try {
        const response = await axios.post(API_URL + 'login', admin)

        if (response.data) {
            localStorage.setItem('admin', JSON.stringify(response.data))
        }
        return response.data

    } catch (error) {
        throw new Error(error.response.data.message)
    }
}
const logout = () => {
    localStorage.removeItem('admin')
}
const getUsers = async (token) => {
    try {
        const config = {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.get(API_URL, config)
        return response.data

    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const editUser = async (userId, userData, token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
  
      const response = await axios.put(API_URL + `user/${userId}`, userData, config);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };


const deleteUser = async (userId, token) => {
    try {
        const config = {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.delete(API_URL + `/user/${userId}`, config)
        return response.data
        
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}
const filterUser = async (search, token) => {
    try {
        const config = {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.post(API_URL + `/user/search`, {search}, config)
        return response.data
        
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const adminApi = {
    logout,
    login,
    editUser,
    deleteUser,
    getUsers,
    filterUser
}

export default adminApi