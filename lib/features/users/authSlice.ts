import { createSlice } from "@reduxjs/toolkit";
import { AuthUserInitialState } from "./auth.types";

const initialState: AuthUserInitialState = {
    userDetails: {},
    isVerified: false,
    isLoading: false,
    error: {}
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
})

export default authSlice.reducer