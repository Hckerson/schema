import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from './lib/encryption'
import { cookies } from 'next/headers'
 
// 1. Specify protected and public routes
const protectedRoutes = ['/booking']
const publicRoutes = ['/login', '/signup']
 
export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path) || path.startsWith('/booking')
  const isPublicRoute = publicRoutes.includes(path)
 
  // 3. Decrypt the session from the cookie
  const session = (await cookies()).get("session")?.value;
  const g_session = (await cookies()).get("g_session")?.value;
  const h_session = (await cookies()).get("h_session")?.value;
  let payload
  if(session){
    payload = await decrypt(session);
  }else if (g_session){
    payload = await decrypt(g_session);
  }else if (h_session){
    payload = await decrypt(h_session);
  }
  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !payload?.sessionId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }
 
  // 5. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    payload?.sessionId &&
    !req.nextUrl.pathname.startsWith('/booking')
  ) {
    return NextResponse.redirect(new URL('/booking', req.nextUrl))
  }
 
  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}