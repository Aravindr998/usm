import { FetchBaseQueryError } from "@reduxjs/toolkit/query"

type ErrorWithMessage = { message?: string }

export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError & { data: ErrorWithMessage } {
  return (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof (error as Record<string, unknown>).data === "object"
  )
}
