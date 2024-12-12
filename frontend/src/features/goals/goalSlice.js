import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import goalService from './goalService' 


const initialState = {
    goals : [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
}

export const getGoals = createAsyncThunk('goals/getAll', async (_,thunkAPI) => {
    try {
        console.log('Getting goals...')
        const token = thunkAPI.getState().auth.user.token
        if(!token){
            throw new Error('User not authorized')
        }
        console.log(token)
        return await goalService.getGoals(token)
    } catch (error) {
        const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)

    }
})

export const createGoal = createAsyncThunk('goals/create', async (text, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.createGoal(text, token)
    } catch (error) {
        const message = (error.response && error.response.data && 
            error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)

    }
})


export const goalSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message =''}
    }, 
    extraReducers: (builder) => {
        builder
        .addCase(getGoals.pending, (state)=>
            state.isLoading = true)
        .addCase(getGoals.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            // console.log(action.payload)
            state.goals = action.payload
        })
        .addCase(getGoals.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            // console.log(action.payload);
            state.message = action.payload
        })
        .addCase(createGoal.pending, (state)=>{
            state.isLoading = true})
        .addCase(createGoal.fulfilled, (state, action)=>{
            state.isLoading = false
            state.isSuccess = true
            console.log('New goal added:', action.payload);
            state.goals.push(action.payload)
        })
        .addCase(createGoal.rejected, (state, action)=>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload


        })
    }

})

export const {reset} = goalSlice.actions
export default goalSlice.reducer