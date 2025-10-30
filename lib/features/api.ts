// api.ts
import { fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { toast } from 'react-toastify'

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
})

const baseQueryWithErrorHandler: typeof baseQuery = async (args, api, extraOptions) => {
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

export default baseQueryWithErrorHandler
