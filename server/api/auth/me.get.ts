import type { AuthResponse } from '#shared/types/user'

export default defineEventHandler(async (event): Promise<AuthResponse> => {
  const user = await requirePermission(event, 'account:read:self')

  return { user }
})
