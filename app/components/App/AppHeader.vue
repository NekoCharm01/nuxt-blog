<template lang="pug">
NLayoutHeader(bordered)
  NFlex(class='mx-auto max-w-screen-2xl px-6 py-5' justify='space-between' align='center' :size='16')
    NuxtLink(to='/')
      span(class='text-2xl font-bold tracking-tight') Field Notes
    NFlex(tag='nav' aria-label='Primary navigation' :size='16' align='center')
      NuxtLink(to='/posts') Posts
      NuxtLink(to='/about') About
      NuxtLink(to='/contact') Contact
      NuxtLink(v-if='userStore.isLoggedIn' to='/account') {{ userStore.user?.name }}
      NButton(v-else type='primary' secondary)
        NuxtLink(to='/auth/login') Sign in
</template>

<script setup lang="ts">
const userStore = useUserStore()
</script>
