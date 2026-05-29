<template lang="pug">
NConfigProvider#app(inline-theme-disabled :theme)
  NGlobalStyle
  NLayout
    AppHeader
    NLayoutContent
      main
        NuxtPage
    AppFooter
</template>

<script setup lang="ts">
import { darkTheme, useOsTheme } from 'naive-ui'

const osTheme = useOsTheme()
const theme = computed(() => {
  return osTheme.value === 'dark' ? darkTheme : null
})
</script>
