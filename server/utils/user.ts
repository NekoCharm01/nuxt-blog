import { hash, verify } from 'argon2'
import type { H3Event } from 'h3'
import { getPermissionsForRole } from '#shared/utils/ability'
import type { PublicUser } from '#shared/types/user'

export async function loginUser(body: { email: string; password: string }) {
  const { email, password } = body
  const db = useDatabase()
  const user = await db.query.users.findFirst({ where: { email } })
  if (!user) {
    throw createError({ status: 403, message: 'User not found' })
  }
  const isPasswordValid = await verify(user.passwordHash, password)
  if (!isPasswordValid) {
    throw createError({ status: 403, message: 'Invalid password' })
  }
  return toPublicUser(user)
}

export async function registerUser(body: { name: string; email: string; password: string }) {
  const { name, email, password } = body
  const db = useDatabase()
  const existingUser = await db.query.users.findFirst({ where: { email } })
  if (existingUser) {
    throw createError({ status: 403, message: 'Email already in use' })
  }
  const passwordHash = await hash(password)
  const newUser = await db
    .insert(users)
    .values({ name, email, passwordHash, role: 'viewer', createdAt: new Date() })
    .returning()

  return toPublicUser(newUser[0]!)
}

export async function getUserById(id: number) {
  const db = useDatabase()
  return await db.query.users.findFirst({ where: { id } })
}

export async function getCurrentUser(event: H3Event) {
  const userId = verifyUser(event)

  if (!userId) {
    return
  }

  const user = await getUserById(userId)
  return user ? toPublicUser(user) : undefined
}

export async function requireCurrentUser(event: H3Event) {
  const user = await getCurrentUser(event)

  if (!user) {
    throw createError({ status: 401, message: 'Authentication required' })
  }

  return user
}

export function setUser(event: H3Event, userId: number) {
  const payload = generateToken(userId)
  setUserCookie(event, payload)
  return payload
}

/**
 * @internal
 */
function setUserCookie(event: H3Event, payload: string) {
  setCookie(event, 'token', payload, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export function clearUser(event: H3Event) {
  deleteCookie(event, 'token')
}

/**
 * @internal
 */
function toPublicUser(
  user: Omit<typeof users.$inferSelect, 'passwordHash'> & { passwordHash?: string }
) {
  const publicUser: PublicUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    role: user.role,
    permissions: [...getPermissionsForRole(user.role)],
  }

  return publicUser
}

/**
 * @internal
 */
function verifyUser(event: H3Event) {
  const authHeader = getHeader(event, 'Authorization')
  const token =
    authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : getCookie(event, 'token')
  if (!token) {
    return
  }
  const userId = verifyToken(token)
  return userId
}
