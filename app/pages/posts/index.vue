<template lang="pug">
NFlex(class="mx-auto max-w-6xl px-6 py-16 sm:py-24" vertical size="large")
  NFlex(class="max-w-3xl" vertical align="flex-start" size="large")
    NTag(:bordered="false" type="primary") Posts
    NH1(class="!text-4xl")
      | Latest writing from Field Notes.
    NP(class="!text-lg !leading-8")
      | Browse recent articles about publishing workflows, product clarity, and practical web
      | development.
  NGrid(class="mt-8" cols="1 m:2 l:3" :x-gap="24" :y-gap="24" responsive="screen" aria-label="Blog posts")
    NGi(
      v-for="post in posts"
      :key="post.slug"
    )
      NCard(class="h-full transition hover:-translate-y-1 hover:shadow-lg" :title="post.title")
        template(#header-extra)
          NTag(size="small" type="primary" :bordered="false") {{ post.category }}
        NFlex(class="h-full" vertical justify="space-between" size="large")
          NP {{ post.excerpt }}
          NFlex(justify="space-between")
            NText(depth="3") {{ post.date }}
            NText(depth="3") {{ post.readingTime }}
          NButton(text type="primary" @click="navigateTo(`/posts/${post.slug}`)") Read post
</template>

<script setup lang="ts">
const { data: posts } = await useFetch('/api/posts', { default: () => [] })
</script>
