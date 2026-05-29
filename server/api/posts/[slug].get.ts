import { z } from 'zod'

const schema = z.object({
  slug: z
    .string()
    .min(1, 'Post slug is required.')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Post slug is invalid.'),
})

export default defineEventHandler(async (event) => {
  const params = getZodRouterParams(event, schema, { decode: true })
  const post = await getPostBySlug(params.slug)

  if (!post) {
    throw createError({ status: 404, message: 'Post not found' })
  }

  return post
})
