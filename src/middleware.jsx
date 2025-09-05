// middleware.js (in root or inside /src)
import { NextResponse } from 'next/server'

export function middleware(req) {
  const token = req.cookies.get('admin_token')

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/','/users','/posts','/category'], // Protect any routes you want
}
