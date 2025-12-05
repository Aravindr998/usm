import { OtpResendData, OtpVerifyData, UserLoginData, UserRegistrationData } from "./auth.types"
import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQueryWithErrorHandler } from "../api";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithErrorHandler,
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data: UserLoginData) => ({ url: "/auth/login", method: "POST", body: data }),
    }),
    registerUser: builder.mutation({
      query: (data: UserRegistrationData) => ({ url: "/auth/register", method: "POST", body: data }),
    }),
    verifyOtp: builder.mutation({
      query: (data: OtpVerifyData) => ({ url: "/auth/verify-otp", method: "POST", body: data }),
    }),
    resendOtp: builder.mutation({
      query: (data: OtpResendData) => ({ url: "/auth/resend-otp", method: "POST", body: data }),
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation, useVerifyOtpMutation, useResendOtpMutation } = authApi