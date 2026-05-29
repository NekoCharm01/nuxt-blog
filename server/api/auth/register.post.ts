import type { AuthResponse } from '#shared/types/user'
import { z } from 'zod'

const schema = z.strictObject({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.email(),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
})

export default defineEventHandler(async (event): Promise<AuthResponse> => {
  const body = await readZodBody(event, schema)
  const user = await registerUser(event, body)

  return { user }
})
