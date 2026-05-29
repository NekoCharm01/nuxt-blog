import type { AuthResponse } from '#shared/types/user'
import { z } from 'zod'

const schema = z.strictObject({
  email: z.email(),
  password: z.string().min(1, 'Password is required.'),
})

export default defineEventHandler(async (event): Promise<AuthResponse> => {
  const body = await readZodBody(event, schema)
  const user = await loginUser(event, body)

  return { user }
})
