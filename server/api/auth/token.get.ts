import { getPermissionsForRole } from '#shared/utils/ability'

export default defineEventHandler(async (event) => {
  const user = await getCurrentUser(event)

  if (!user) {
    throw createError({ status: 401, message: 'Authentication required' })
  }

  const token = setUser(event, user.id)
  return { token, permissions: getPermissionsForRole(user.role) }
})
