import { z } from 'zod'
import { subject } from '@casl/ability'

const paramsSchema = z.object({
  id: z.coerce.number().int().positive(),
})

const bodySchema = z.strictObject({
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
  const params = getZodRouterParams(event, paramsSchema)
  const existingPost = await getPostById(params.id)

  if (!existingPost) {
    throw createError({ status: 404, message: 'Post not found' })
  }

  const ability = defineAbilityFor(user)

  if (ability.cannot('update', subject('Post', existingPost))) {
    throw createError({ status: 403, message: 'You do not have permission to update this post' })
  }

  const body = await readZodBody(event, bodySchema)

  if (await isPostSlugTaken(body.slug, params.id)) {
    throw createError({ status: 409, message: 'Post slug already exists' })
  }

  return await updatePost(params.id, body)
})
