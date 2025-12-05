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

export function getCookie(key: string) {
  const cookieList = document.cookie.split(";")
  const cookie = cookieList.find(item => item.includes(key))
  return decodeURIComponent(cookie?.split("=")?.[1] || "")
}

export function setCookie(name: string, value: string, days = 10) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();

  document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/`;
}