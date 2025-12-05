// api.ts
import { getCookie } from '@/utils/common'
import { FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { toast } from 'react-toastify'

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
})

export const baseQueryWithErrorHandler: typeof baseQuery = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)

  if (result.error) {
    const err = result.error as FetchBaseQueryError
    const message =
      typeof err.data === 'string'
        ? err.data
        : (err.data as { message?: string })?.message || 'Something went wrong!'

    toast.error(message)
  }

  return result
}

export const baseQueryWithAuth: typeof baseQuery = async (args, api, extraOptions) => {
  const token = getCookie('token')

  if (token) {
    (args as FetchArgs).headers = {
      ...((args as FetchArgs).headers || {}),
      Authorization: `Bearer ${token}`,
    }
  }
  
  return baseQueryWithErrorHandler(args, api, extraOptions)
}