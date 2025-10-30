import { createSlice } from "@reduxjs/toolkit";
import { UserInitialState } from "./user.types";

const initialState: UserInitialState = {
    userDetails: {},
    isVerified: false,
    isLoading: false,
    error: {}
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
})

export default userSlice.reducer