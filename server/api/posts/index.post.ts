import { z } from 'zod'

const schema = z.strictObject({
  slug: z
    .string()
    .trim()
    .min(1, 'Post slug is required.')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Post slug is invalid.'),
  title: z.string().trim().min(1, 'Post title is required.'),
  excerpt: z.string().trim().min(1, 'Post excerpt is required.'),
  category: z.string().trim().min(1, 'Post category is required.'),
  content: z.string().trim().min(1, 'Post content is required.'),
})

export default defineEventHandler(async (event) => {
  const user = await requireCurrentUser(event)
  const ability = defineAbilityFor(user)

  if (ability.cannot('create', 'Post')) {
    throw createError({ status: 403, message: 'You do not have permission to create posts' })
  }

  const body = await readZodBody(event, schema)

  if (await isPostSlugTaken(body.slug)) {
    throw createError({ status: 409, message: 'Post slug already exists' })
  }

  const post = await createPost(user.id, body)
  return post
})
