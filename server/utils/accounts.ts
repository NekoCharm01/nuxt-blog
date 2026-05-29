import { v4 as uuidV4 } from 'uuid'
import { hash, verify } from 'argon2'
import type { H3Event } from 'h3'
import type { UserRow } from './database'
import type { PublicUser } from '#shared/types/user'
import type { UserRole } from '#shared/types/user'

const sessionCookieName = 'account_session'

function toPublicUser(user: StoredUser | null): PublicUser | null {
  if (!user) {
    return null
  }

  const { passwordHash: _passwordHash, ...publicUser } = user

  return publicUser
}

export async function getCurrentUser(event: H3Event) {
  const userId = getCookie(event, sessionCookieName)

  if (!userId) {
    return null
  }

  const [row] = await useDatabase()<UserRow[]>`
    SELECT id, name, email, role, password_hash, created_at AS "createdAt"
    FROM users
    WHERE id = ${userId}
  `

  return toPublicUser(row ? mapUser(row) : null)
}

export async function registerUser(
  event: H3Event,
  input: { name: string; email: string; password: string }
) {
  const name = input.name.trim()
  const email = input.email.trim().toLowerCase()

  if (name.length < 2) {
    throw createError({ status: 400, message: 'Name must be at least 2 characters.' })
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    throw createError({ status: 400, message: 'Enter a valid email address.' })
  }

  if (input.password.length < 8) {
    throw createError({ status: 400, message: 'Password must be at least 8 characters.' })
  }

  const [existingUser] = await useDatabase()<Array<{ id: string }>>`
    SELECT id
    FROM users
    WHERE email = ${email}
  `

  if (existingUser) {
    throw createError({
      status: 409,
      message: 'An account with this email already exists.',
    })
  }

  const role = await getInitialAccountRole()
  const user = {
    id: uuidV4(),
    name,
    email,
    role,
    permissions: getPermissionsForRole(role),
    passwordHash: await hash(input.password),
    createdAt: new Date().toISOString(),
  }

  await useDatabase()`
    INSERT INTO users (id, name, email, role, password_hash, created_at)
    VALUES (${user.id}, ${user.name}, ${user.email}, ${user.role}, ${user.passwordHash}, ${user.createdAt})
  `

  setSession(event, user.id)

  return toPublicUser(user)!
}

export async function loginUser(event: H3Event, input: { email: string; password: string }) {
  const email = input.email.trim().toLowerCase()
  const [row] = await useDatabase()<UserRow[]>`
    SELECT id, name, email, role, password_hash, created_at AS "createdAt"
    FROM users
    WHERE email = ${email}
  `
  const user = row ? mapUser(row) : null

  if (!user || !(await verify(user.passwordHash, input.password))) {
    throw createError({ status: 401, message: 'Invalid email or password.' })
  }

  setSession(event, user.id)

  return toPublicUser(user)!
}

export function clearAccountSession(event: H3Event) {
  deleteCookie(event, sessionCookieName, { path: '/' })
}

function setSession(event: H3Event, userId: string) {
  setCookie(event, sessionCookieName, userId, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  })
}

async function getInitialAccountRole(): Promise<UserRole> {
  const [userCount] = await useDatabase()<Array<{ count: string }>>`
    SELECT COUNT(*) AS count
    FROM users
  `

  return Number(userCount?.count ?? 0) === 0 ? 'admin' : 'reader'
}
