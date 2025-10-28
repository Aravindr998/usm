import { networkRequest } from "@/network/http/networkRequest"
import { OtpVerifyData, UserLoginData, UserRegistrationData } from "./user.types"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/users" }),
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (data) => ({ url: "/login", method: "POST", body: data })
        }),
        registerUser: builder.mutation({
            query: (data) => ({ url: "/register", method: "POST", body: data })
        }),
        verifyOtp: builder.mutation({
            query: (data) => ({ url: "/verify-otp", method: "POST", body: data })
        })
    })
})

export const { useLoginUserMutation, useRegisterUserMutation, useVerifyOtpMutation } = userApi

export const loginUserApi = async (data: UserLoginData) => {
    const response = await networkRequest("/users/login", {
        method: "POST",
        body: data
    })
    return response
}

export const registerUserApi = async (data: UserRegistrationData) => {
    const response = await networkRequest("/users/register", {
        method: "POST",
        body: data
    })
    return response
}

export const verifyOtpApi = async (data: OtpVerifyData) => {
    const response = await networkRequest("/users/verify-otp", {
        method: "POST",
        body: data
    })
    return response
}