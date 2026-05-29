import { hash, verify } from 'argon2'

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
  return { id: user.id, name: user.name, email: user.email, role: user.role }
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
    .returning({ id: users.id, name: users.name, email: users.email, role: users.role })
  return newUser
}
