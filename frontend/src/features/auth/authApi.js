
import axios from 'axios'

const API_URL = 'http://localhost:5000/api/users/'

const register = async (userData) => {
    try {
        const response = await axios.post(API_URL + "register", userData)

        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data))
        }
        return response.data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const login = async (userData) => {
    try {
        const response = await axios.post(API_URL + 'login', userData)

        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data))
        }
        return response.data

    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const logout = () => {
    localStorage.removeItem('user')
}

const changeUserImage = async (imageUrl, token) => {
    try {
        const config = {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.put(API_URL , {imageUrl}, config)
        console.log(response.data)
        return response.data

    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const getUserData = async (token) => {
    try {
        console.log(token, 'thins is token in getUsersata')
        const config = {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.get(API_URL, config)
        console.log(response,'response in getuserdata')
        return response.data

    } catch (error) {
        throw new Error(error.response.data.message)
    }
}


const authApi = {
    register,
    logout,
    login,
    changeUserImage,
    getUserData
}

export default authApi