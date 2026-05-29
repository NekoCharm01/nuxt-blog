export type UserRole = 'admin' | 'editor' | 'viewer'

export type User = {
  id: number
  name: string
  email: string
  passwordHash: string
  createdAt: Date
  role: UserRole
}
