import axios from 'axios'

const API_URL = '/api/goals/'

//Get user goals
const getGoals = async (token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    
    try {
        console.log('Making request to:', API_URL)
        console.log('With config:', config)
        const response = await axios.get(API_URL, config)
        console.log('Response received:', response.data)
        return response.data
    } catch (error) {
        console.error('Error in getGoals:', error.response || error)
        throw error
        }
    }

//Create goal
const createGoal = async (text, token) => {
    const config ={
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    const response = await axios.post(API_URL, text, config)

    return response.data
}


const goalService = {
    getGoals,
    createGoal,
}

export default goalService 