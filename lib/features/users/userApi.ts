import { OtpResendData, OtpVerifyData, UserLoginData, UserRegistrationData } from "./user.types"
import { createApi } from "@reduxjs/toolkit/query/react"
import baseQueryWithErrorHandler from "../api";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithErrorHandler,
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data: UserLoginData) => ({ url: "/users/login", method: "POST", body: data }),
    }),
    registerUser: builder.mutation({
      query: (data: UserRegistrationData) => ({ url: "/users/register", method: "POST", body: data }),
    }),
    verifyOtp: builder.mutation({
      query: (data: OtpVerifyData) => ({ url: "/users/verify-otp", method: "POST", body: data }),
    }),
    resendOtp: builder.mutation({
      query: (data: OtpResendData) => ({ url: "/users/resend-otp", method: "POST", body: data }),
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation, useVerifyOtpMutation, useResendOtpMutation } = userApi