import { z } from 'zod'
import { subject } from '@casl/ability'

const schema = z.object({
  id: z.coerce.number().int().positive(),
})

export default defineEventHandler(async (event) => {
  const user = await requireCurrentUser(event)
  const params = getZodRouterParams(event, schema)
  const post = await getPostById(params.id)

  if (!post) {
    throw createError({ status: 404, message: 'Post not found' })
  }

  const ability = defineAbilityFor(user)

  if (ability.cannot('delete', subject('Post', post))) {
    throw createError({ status: 403, message: 'You do not have permission to delete this post' })
  }

  await deletePost(params.id)
  setResponseStatus(event, 204)
})
