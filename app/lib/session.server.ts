import bcrypt from "bcrypt"
import { db } from "./db.server"
import { createCookieSessionStorage, redirect } from "remix"
import randomAvatar from "../../utilts/randomAvatar"

// *********************************************************************************
// Login User
interface loginProps {
   email: FormDataEntryValue | null
   password: FormDataEntryValue | null
}
export const login = async ({ email, password }: loginProps) => {
   if (typeof email === "string" && typeof password === "string") {
      const user = await db.user.findUnique({ where: { email } })

      if (!user) return null

      // Check Password
      const isCorrectPassword = await bcrypt.compare(password, user.passwordHash)

      if (!isCorrectPassword) return null

      return user
   } else {
      return null
   }
}

// *********************************************************************************
// register User
interface registerProps {
   username: FormDataEntryValue | null
   email: FormDataEntryValue | null
   password: FormDataEntryValue | null
}
export const register = async ({ username, email, password }: registerProps) => {
   if (typeof email === "string" && typeof username === "string" && typeof password === "string") {
      const passwordHash = await bcrypt.hash(password, 10)

      return db.user.create({
         data: { username, email, passwordHash, profile: { create: { avatar: randomAvatar() } } },
      })
   } else {
      return null
   }
}

// *********************************************************************************
// Get Session secret
const sessionSecret = process.env.SESSION_SECRET
if (!sessionSecret) throw new Error("No Session Secret")

// Create session storage
const storage = createCookieSessionStorage({
   cookie: {
      name: "reloox_session",
      secure: process.env.NODE_ENV === "production",
      secrets: [sessionSecret],
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7days
      httpOnly: true,
   },
})

// *********************************************************************************
// Create Session
export const createUserSession = async (userId: number, redirectTo: string) => {
   const session = await storage.getSession()

   session.set("userId", userId)

   return redirect(redirectTo, {
      headers: {
         "Set-Cookie": await storage.commitSession(session),
      },
   })
}

// *********************************************************************************
//  Get user Session
export const getUserSesson = (request: Request) => {
   return storage.getSession(request.headers.get("Cookie"))
}

// *********************************************************************************
// Get logged in User
export const getUser = async (request: Request) => {
   const session = await getUserSesson(request)
   const userId = session.get("userId")

   if (!userId) {
      return null
   }

   try {
      const user = await db.user.findUnique({
         where: { id: userId },
         select: { email: true, username: true, createdAt: true, profile: true },
      })

      return user
   } catch (error) {
      return null
   }
}

// *********************************************************************************
// log out User and destroy session
export const logout = async (request: Request) => {
   const session = await storage.getSession(request.headers.get("Cookie"))

   return redirect("/auth/logout", {
      headers: {
         "Set-Cookie": await storage.destroySession(session),
      },
   })
}
