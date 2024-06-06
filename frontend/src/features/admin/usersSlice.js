import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import adminApi from './adminApi'

const initialState = {
    users: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''
}

export const getUsers = createAsyncThunk('users/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().admin.admin.token
        return await adminApi.getUsers(token)
    } catch (error) {
        const message = (error.response && error.reponse.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteUser = createAsyncThunk('users/delete', async (userId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().admin.admin.token
        return await adminApi.deleteUser(userId, token)
    } catch (error) {
        const message = (error.response && error.reponse.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const editUser = createAsyncThunk('users/edit', async ({ userId, userData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().admin.admin.token;
      return await adminApi.editUser(userId, userData, token);
    } catch (error) {
      const message = (error.response && error.reponse.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  });
  
export const filterUser = createAsyncThunk('users/filter', async (search, thunkAPI) => {
    try {
        const token = thunkAPI.getState().admin.admin.token
        return await adminApi.filterUser(search, token)

    } catch (error) {
        const message = (error.response && error.reponse.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)

    }
})


export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.users = action.payload
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.users = state.users.filter(
                    (user) => user._id !== action.payload.id
                )
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(editUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.users = state.users.map(
                    (user) => {
                        if (user._id !== action.payload._id) return user
                        return action.payload
                    }
                )
            })
            .addCase(editUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(filterUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(filterUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.users = action.payload
            })
            .addCase(filterUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = usersSlice.actions
export default usersSlice.reducer