import { z } from 'zod'

const schema = z.strictObject({
  email: z.email(),
  password: z.string().min(1, 'Password is required.'),
})

export default defineEventHandler(async (event) => {
  const body = await readZodBody(event, schema)
  const user = await loginUser(body)

  return user
})
