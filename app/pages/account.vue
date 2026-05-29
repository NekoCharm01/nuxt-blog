<template lang="pug">
NFlex(class="mx-auto max-w-4xl px-6 py-16 sm:py-24" vertical size="large")
  NFlex(vertical align="flex-start" size="small")
    NTag(:bordered="false" type="success") Signed in
    NH1(class="!text-4xl") Account
    NP(depth="3") Manage your Field Notes profile.
  NCard(v-if="userStore.user" size="large")
    NDescriptions(:column="1" label-placement="top" bordered)
      NDescriptionsItem(label="Name") {{ userStore.user.name }}
      NDescriptionsItem(label="Email") {{ userStore.user.email }}
      NDescriptionsItem(label="Role") {{ userStore.user.role }}
      NDescriptionsItem(label="Permissions")
        NFlex(:size="8")
          NTag(v-for="permission in userStore.user.permissions" :key="permission" size="small") {{ permission }}
      NDescriptionsItem(label="Member since") {{ joinedAt }}
    template(#footer)
      NButton(type="error" secondary :loading="isLoggingOut" @click="logout") Sign out
  NCard(v-if="userStore.canReadUsers" title="Users" size="large")
    NDataTable(:columns="columns" :data="users" :loading="isLoadingUsers")
</template>

<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui'
import type { PublicUser } from '#shared/types/user'

const userStore = useUserStore()
const isLoggingOut = ref(false)
const users = ref<PublicUser[]>([])
const isLoadingUsers = ref(false)

const columns: DataTableColumns<PublicUser> = [
  { title: 'Name', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Role', key: 'role' },
]

if (!userStore.isLoggedIn) {
  await navigateTo('/login')
}

const joinedAt = computed(() => {
  if (!userStore.user) {
    return ''
  }

  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(
    new Date(userStore.user.createdAt)
  )
})

if (userStore.canReadUsers) {
  await fetchUsers()
}

async function logout() {
  isLoggingOut.value = true

  try {
    await userStore.logout()
    await navigateTo('/')
  } finally {
    isLoggingOut.value = false
  }
}

async function fetchUsers() {
  isLoadingUsers.value = true

  try {
    users.value = await $fetch('/api/users')
  } finally {
    isLoadingUsers.value = false
  }
}
</script>
