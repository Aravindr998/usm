import { createApi } from "@reduxjs/toolkit/query/react";
import {baseQueryWithAuth} from "../api";
import { GetUserDetailsResponse } from "@/types/api.types";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        getUserDetails: builder.query<GetUserDetailsResponse, string>({
            query: () => ({ url: `/users/details`, method: "GET" }),
        }),
    }),
})

export const { useGetUserDetailsQuery } = userApi