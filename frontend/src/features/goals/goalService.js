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
        console.log('-----------------')
        const response = await axios.get(API_URL, config)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error(error)
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