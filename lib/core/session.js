import { headers } from "next/headers"
import { auth } from "../auth"
import { redirect } from "next/navigation"

export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers() 
  })
  return session?.user || null
}

export const requireRole = async (role) => {
  const user = await getUserSession()
  
  // 1. If no user is logged in, send them to login
  if (!user) {
    return redirect('/login') 
  }
  
  // 2. If the user exists but has the wrong role, send them to unauthorized
  if (user.role !== role) {
    return redirect('/unauthorized')
  }
  return user
}