export default defineEventHandler(async (event) => {
  const user = await getCurrentUser(event)

  if (!user) {
    throw createError({ status: 401, message: 'Authentication required' })
  }

  return { user }
})
