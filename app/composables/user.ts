import type { AuthResponse, PublicUser } from '#shared/types/user'

export const useUserStore = defineStore('user', () => {
  const user = ref<PublicUser | null>(null)
  const isLoading = ref(false)
  const isLoggedIn = computed(() => Boolean(user.value))
  const canReadUsers = computed(() => hasPermission('users:read'))

  function hasPermission(permission: PublicUser['permissions'][number]) {
    return Boolean(user.value?.permissions.includes(permission))
  }

  async function fetchUser() {
    isLoading.value = true

    try {
      const response = await $fetch<AuthResponse>('/api/auth/me')
      user.value = response.user
    } catch {
      user.value = null
    } finally {
      isLoading.value = false
    }
  }

  async function register(input: { name: string; email: string; password: string }) {
    const response = await $fetch<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: input,
    })

    user.value = response.user
  }

  async function login(input: { email: string; password: string }) {
    const response = await $fetch<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: input,
    })

    user.value = response.user
  }

  async function logout() {
    await $fetch('/api/auth/logout', { method: 'POST' })
    clearUser()
  }

  function clearUser() {
    user.value = null
  }

  return {
    user,
    isLoading,
    isLoggedIn,
    canReadUsers,
    hasPermission,
    fetchUser,
    register,
    login,
    logout,
    clearUser,
  }
})
