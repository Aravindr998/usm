import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUserApi, registerUserApi, verifyOtpApi } from "./userApi";
import { OtpVerifyData, UserInitialState, UserLoginData, UserRegistrationData } from "./user.types";

const initialState: UserInitialState = {
    userDetails: {},
    isVerified: false,
    isLoading: false,
    error: {}
}

export const loginUser = createAsyncThunk("user/loginUser", async(data: UserLoginData, thunkApi) => {
    const userData = await loginUserApi(data)
    if (!userData?.success) {
        return thunkApi.rejectWithValue(userData)
    }
    return userData
})

export const registerUser = createAsyncThunk("user/registerUser", async (data: UserRegistrationData, thunkApi) => {
    const userData = await registerUserApi(data)
    console.log('userData?.success: ', userData?.success);
    if (!userData?.success) {
        return thunkApi.rejectWithValue(userData)
    }
    return userData
})

export const verifyOtp = createAsyncThunk("user/verifyOtp", async (data: OtpVerifyData, thunkApi) => {
    const verificationData = await verifyOtpApi(data)
    if (!verificationData?.success) {
        return thunkApi.rejectWithValue(verificationData)
    }
    return verificationData
})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.userDetails = action.payload
            state.isLoading = false
            state.error = {}
        })
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true
            state.error = {}
            state.userDetails = {}
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
            state.userDetails = {}
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.userDetails = action.payload
            state.isLoading = false
            state.error = {}
        })
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true
            state.userDetails = {}
            state.error = {}
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.error = action.payload
            state.isLoading = false
            state.userDetails = {}
        })
        builder.addCase(verifyOtp.fulfilled, (state, action) => {
            state.userDetails = action.payload
            state.isVerified = true
            state.isLoading = false
        })
        builder.addCase(verifyOtp.pending, (state) => {
            state.isLoading = true
            state.isVerified = false
            state.error = {}
        })
        builder.addCase(verifyOtp.rejected, (state, action) => {
            state.error = action.payload
            state.isVerified = false
            state.isLoading = false
        })
    }
})

export default userSlice.reducer