import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import authService from "./authService"

const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
    user: user ? user : null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''
}


export const createUser = createAsyncThunk("users/register",
    async (formData, thunkAPI) => {

        try {
            return await authService.register(formData)

        } catch (error) {
            const message = (
                error.response && error.response.data
                && error.response.data.message
            ) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }

    })

export const loginUser = createAsyncThunk("auth/login_user",
    async (formData, thunkAPI) => {

        try {
            return await authService.loginUser(formData)

        } catch (error) {
            const message = (
                error.response && error.response.data
                && error.response.data.message
            ) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }

    })

export const logout = createAsyncThunk('auth/logout', async () => {
    await localStorage.removeItem("user")
})


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.user = null
        },
        loadUser: (state) => {
            state.user = user
        }
    },

    extraReducers: (builder) => {
        builder.addCase(createUser.pending, (state) => {
            state.isLoading = true
        })
            .addCase(createUser.fulfilled, (state, action) => {
                state.isLoading = true
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null

            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = true
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null

            })
            .addCase(logout, (state, action) => {
                state.user = null
            })

    }



})


export const { reset, loadUser } = authSlice.actions;
export default authSlice.reducer;

