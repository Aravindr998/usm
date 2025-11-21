import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
const publicGuardRoutes = ["/login", "/signup"]
const publicRoutes = ["/about"]
export function proxy(request: NextRequest) {
    const tokenCookie = request.cookies.get("token")
    const pathname = request.nextUrl.pathname
    if (tokenCookie && publicGuardRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/", request.url))
    } else if (!tokenCookie && (!publicRoutes.includes(pathname) && !publicGuardRoutes.includes(pathname))) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  return NextResponse.next()
}
 
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ]
}